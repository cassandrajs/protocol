import { CodecGroup } from "./CodecGroup"
import { CodecGroupRegistry } from "./CodecGroupRegistry"
import { Compressor } from "./Compressor"
import { IllegalArgumentError } from "./errors/IllegalArgumentError"
import { Frame } from "./Frame"
import { NoopCompressor } from "./NoopCompressor"
import { PrimitiveCodec } from "./PrimitiveCodec"
import { PrimitiveSizes } from "./PrimitiveSizes"
import { ProtocolMessageCodec } from "./ProtocolMessageCodec"
import { ProtocolV3ClientCodecs } from "./ProtocolV3ClientCodecs"
import { ProtocolV3ServerCodecs } from "./ProtocolV3ServerCodecs"
import { ProtocolV4ClientCodecs } from "./ProtocolV4ClientCodecs"
import { ProtocolV4ServerCodecs } from "./ProtocolV4ServerCodecs"
import { ProtocolV5ClientCodecs } from "./ProtocolV5ClientCodecs"
import { ProtocolV5ServerCodecs } from "./ProtocolV5ServerCodecs"
import { ProtocolV6ClientCodecs } from "./ProtocolV6ClientCodecs"
import { ProtocolV6ServerCodecs } from "./ProtocolV6ServerCodecs"
import { Flags } from "./util/Flags"
import { IntIntMap } from "./util/IntIntMap"
import { isObjectEmpty } from "./util/isObjectEmpty"
import { Opcode, ProtocolConstants } from "./util/ProtocolConstants"
import { UUID } from "./util/UUID"

export class FrameCodec<B> {
	//#region Static methods
	/**
	 * The header size for protocol v3 and above. Currently, it is the same for all supported protocol
	 * versions.
	 *
	 * <p>If you have a reference to an instance of this class, {@link #encodedHeaderSize(Frame)} is a
	 * more future-proof way to get this information.
	 */
	static V3_ENCODED_HEADER_SIZE: number = 9

	/**
	 * Builds a new instance with the default codecs for a client (encoding requests, decoding
	 * responses).
	 */
	static defaultClient<B>(
		primitiveCodec: PrimitiveCodec<B>,
		compressor: Compressor<B>
	): FrameCodec<B> {
		return new FrameCodec<B>(
			primitiveCodec,
			compressor,
			new ProtocolV3ClientCodecs(),
			new ProtocolV4ClientCodecs(),
			new ProtocolV5ClientCodecs(),
			new ProtocolV6ClientCodecs()
		)
	}

	/**
	 * Builds a new instance with the default codecs for a server (decoding requests, encoding
	 * responses).
	 */
	static defaultServer<B>(
		primitiveCodec: PrimitiveCodec<B>,
		compressor: Compressor<B>
	): FrameCodec<B> {
		return new FrameCodec<B>(
			primitiveCodec,
			compressor,
			new ProtocolV3ServerCodecs(),
			new ProtocolV4ServerCodecs(),
			new ProtocolV5ServerCodecs(),
			new ProtocolV6ServerCodecs()
		)
	}

	//#endregion

	primitiveCodec: PrimitiveCodec<B>
	compressor: Compressor<B>
	encoders: IntIntMap<ProtocolMessageCodec>
	decoders: IntIntMap<ProtocolMessageCodec>

	constructor(
		primitiveCodec: PrimitiveCodec<B>,
		compressor: Compressor<B>,
		...codecGroups: CodecGroup[]
	) {
		if (!primitiveCodec) {
			throw new IllegalArgumentError("primitiveCodec can't be null")
		}
		if (!compressor) {
			throw new IllegalArgumentError(
				"compressor can't be null, use Compressor.none()"
			)
		}

		this.primitiveCodec = primitiveCodec
		this.compressor = compressor
		const encodersBuilder = IntIntMap.builder<ProtocolMessageCodec>()
		const decodersBuilder = IntIntMap.builder<ProtocolMessageCodec>()

		const registry: CodecGroupRegistry = {
			addCodec: function (codec: ProtocolMessageCodec): CodecGroupRegistry {
				this.addEncoder(codec)
				this.addDecoder(codec)
				return registry
			},
			addEncoder: function (codec: ProtocolMessageCodec): CodecGroupRegistry {
				encodersBuilder.put(codec.protocolVersion, codec.opcode, codec)
				return registry
			},
			addDecoder: function (codec: ProtocolMessageCodec): CodecGroupRegistry {
				decodersBuilder.put(codec.protocolVersion, codec.opcode, codec)
				return registry
			},
		}

		for (const codecGroup of codecGroups) {
			codecGroup.registerCodecs(registry)
		}

		this.encoders = encodersBuilder.build()
		this.decoders = decodersBuilder.build()
	}

	encode(frame: Frame): B {
		const protocolVersion = frame.protocolVersion

		if (
			protocolVersion < ProtocolConstants.Version.V4 &&
			frame.customPayload &&
			Object.keys(frame.customPayload).length > 0
		) {
			throw new IllegalArgumentError(
				`Custom payload is not supported in protocol v${frame.protocolVersion}. Requires v4 or above`
			)
		}

		if (
			protocolVersion < ProtocolConstants.Version.V4 &&
			frame.warnings &&
			Object.keys(frame.warnings).length > 0
		) {
			throw new IllegalArgumentError(
				`Warnings are not supported in protocol v${frame.protocolVersion}. Requires v4 or above`
			)
		}

		const messageEncoder: ProtocolMessageCodec = this.getMessageEncoder(frame)

		const headerSize: number = this.encodedHeaderSize(frame)
		const bodySize: number = this.encodedBodySize(frame)
		const flags: number = this.computeFlags(frame)
		if (!Flags.contains(flags, ProtocolConstants.FrameFlag.COMPRESSED)) {
			// No compression: we can optimize and do everything with a single allocation
			const dest = this.primitiveCodec.allocate(headerSize + bodySize)
			this.encodeInto(frame, bodySize, dest, flags, messageEncoder)
			return dest
		} else {
			// We need to compress first in order to know the body size
			// 1) Encode uncompressed body
			const uncompressedBody = this.primitiveCodec.allocate(bodySize)
			this.encodeBodyInto(frame, messageEncoder, uncompressedBody)

			// 2) Compress and measure size, discard uncompressed buffer
			const compressedBody = this.compressor.compress(uncompressedBody)
			this.primitiveCodec.release(uncompressedBody)
			const compressedBodySize = this.primitiveCodec.sizeOf(compressedBody)

			// 3) Encode final frame
			const header = this.primitiveCodec.allocate(headerSize)
			this.encodeHeaderInto(frame, flags, compressedBodySize, header)
			return this.primitiveCodec.concat(header, compressedBody)
		}
	}

	/**
	 * Encodes the given frame into an existing buffer.
	 *
	 * <p>Note that this method never compresses the frame body; it is intended for protocol v5+,
	 * where multiple frames are concatenated into a single buffer and compressed together, instead of
	 * individually.
	 *
	 * <p>The caller is responsible for ensuring that the buffer has enough space remaining, that is:
	 * {@link #encodedHeaderSize(Frame)} + {@link #encodedBodySize(Frame)} bytes.
	 *
	 * @param bodySize the body size to use in the header, if available. This is just an optimization
	 *     because the caller may already know it if it has performed the size check above. If not,
	 *     pass a negative value, and it will be recomputed.
	 */
	public encodeInto(
		frame: Frame,
		bodySize: number,
		dest: B,
		flags?: any,
		encoder?: ProtocolMessageCodec
	) {
		if (!flags || !encoder) {
			if (!flags) flags = this.computeFlags(frame)
			if (!encoder) encoder = this.getMessageEncoder(frame)
			return this.encodeInto(frame, bodySize, dest, flags, encoder)
		}

		this.encodeHeaderInto(frame, flags, bodySize, dest)
		this.encodeBodyInto(frame, encoder, dest)
	}

	private getMessageEncoder(frame: Frame): ProtocolMessageCodec {
		const encoder = this.encoders.get(
			frame.protocolVersion,
			frame.message.opcode
		)
		if (!encoder) {
			throw new IllegalArgumentError(
				`Unsupported opcode ${ProtocolConstants.OpcodeToString(frame.message.opcode)} in protocol v${frame.protocolVersion}`
			)
		}
		return encoder
	}

	private computeFlags(frame: Frame): number {
		let flags: number = 0
		if (
			!(this.compressor instanceof NoopCompressor) &&
			frame.message.opcode != ProtocolConstants.Opcode.STARTUP &&
			frame.message.opcode != ProtocolConstants.Opcode.OPTIONS
		) {
			flags = Flags.add(flags, ProtocolConstants.FrameFlag.COMPRESSED)
		}
		if (frame.tracing || frame.tracingId != null) {
			flags = Flags.add(flags, ProtocolConstants.FrameFlag.TRACING)
		}
		if (!isObjectEmpty(frame.customPayload)) {
			flags = Flags.add(flags, ProtocolConstants.FrameFlag.CUSTOM_PAYLOAD)
		}
		if (!isObjectEmpty(frame.warnings)) {
			flags = Flags.add(flags, ProtocolConstants.FrameFlag.WARNING)
		}
		if (frame.protocolVersion == ProtocolConstants.Version.BETA) {
			flags = Flags.add(flags, ProtocolConstants.FrameFlag.USE_BETA)
		}
		return flags
	}

	private encodeHeaderInto(
		frame: Frame,
		flags: number,
		bodySize: number,
		dest: B
	) {
		if (bodySize < 0) {
			bodySize = this.encodedBodySize(frame)
		}

		let versionAndDirection = frame.protocolVersion
		if (frame.message.isResponse) {
			versionAndDirection |= 0b1000_0000
		}
		this.primitiveCodec.writeByte(versionAndDirection, dest)
		this.primitiveCodec.writeByte(flags, dest)
		this.primitiveCodec.writeUnsignedShort(
			frame.streamId & 0xffff, // see readStreamId()
			dest
		)
		this.primitiveCodec.writeByte(frame.message.opcode, dest)
		this.primitiveCodec.writeInt(bodySize, dest)
	}

	private encodeBodyInto(
		frame: Frame,
		messageEncoder: ProtocolMessageCodec,
		dest: B
	) {
		this.encodeTracingId(frame.tracingId, dest)
		this.encodeCustomPayload(frame.customPayload, dest)
		this.encodeWarnings(frame.warnings, dest)
		messageEncoder.encode(dest, frame.message, this.primitiveCodec)
	}

	private encodeTracingId(tracingId: UUID, dest: B) {
		if (tracingId != null) {
			this.primitiveCodec.writeUuid(tracingId, dest)
		}
	}

	private encodeCustomPayload(
		customPayload: { [key: string]: Uint8Array },
		dest: B
	) {
		if (!isObjectEmpty(customPayload)) {
			this.primitiveCodec.writeBytesMap(customPayload, dest)
		}
	}

	private encodeWarnings(warnings: string[], dest: B) {
		if (!isObjectEmpty(warnings)) {
			this.primitiveCodec.writeStringList(warnings, dest)
		}
	}

	encodedHeaderSize(frame?: Frame): number {
		return FrameCodec.V3_ENCODED_HEADER_SIZE
	}

	encodedBodySize(frame: Frame): number {
		let size = 0
		if (frame.tracingId != null) {
			size += PrimitiveSizes.UUID
		}
		if (!isObjectEmpty(frame.customPayload)) {
			size += PrimitiveSizes.sizeOfBytesMap(frame.customPayload)
		}
		if (!isObjectEmpty(frame.warnings)) {
			size += PrimitiveSizes.sizeOfStringList(frame.warnings)
		}

		const encoder = this.getMessageEncoder(frame)
		return size + encoder.encodedSize(frame.message)
	}

	decodeBodySize(source: B): number {
		return this.primitiveCodec.readInt(
			source,
			FrameCodec.V3_ENCODED_HEADER_SIZE - 4
		)
	}

	decode(source: B): Frame {
		const directionAndVersion = this.primitiveCodec.readByte(source)
		const isResponse = (directionAndVersion & 0b1000_0000) == 0b1000_0000
		const protocolVersion = directionAndVersion & 0b0111_1111
		const flags = this.primitiveCodec.readByte(source)
		const beta = Flags.contains(flags, ProtocolConstants.FrameFlag.USE_BETA)
		const streamId = this.readStreamId(source)
		const opcode = this.primitiveCodec.readByte(source) as Opcode
		const length = this.primitiveCodec.readInt(source)

		let decompressed = false
		if (Flags.contains(flags, ProtocolConstants.FrameFlag.COMPRESSED)) {
			const newSource = this.compressor.decompress(source)
			// if decompress returns a different object, track this so we know to release it when done.
			if (newSource != source) {
				decompressed = true
				source = newSource
			}
		}

		let frameSize: number
		let compressedFrameSize: number
		if (decompressed) {
			frameSize =
				FrameCodec.V3_ENCODED_HEADER_SIZE + this.primitiveCodec.sizeOf(source)
			compressedFrameSize = FrameCodec.V3_ENCODED_HEADER_SIZE + length // what we measured before decompressing
		} else {
			frameSize = FrameCodec.V3_ENCODED_HEADER_SIZE + length
			compressedFrameSize = -1
		}

		const isTracing = Flags.contains(flags, ProtocolConstants.FrameFlag.TRACING)
		const tracingId: UUID =
			isResponse && isTracing ? this.primitiveCodec.readUuid(source) : null

		const customPayload = Flags.contains(
			flags,
			ProtocolConstants.FrameFlag.CUSTOM_PAYLOAD
		)
			? this.primitiveCodec.readBytesMap(source)
			: {}

		const warnings =
			isResponse && Flags.contains(flags, ProtocolConstants.FrameFlag.WARNING)
				? this.primitiveCodec.readStringList(source)
				: []

		const decoder = this.decoders.get(protocolVersion, opcode)
		if (!decoder) {
			throw new IllegalArgumentError(
				`Unsupported request opcode: ${ProtocolConstants.OpcodeToString(opcode)} in protocol ${protocolVersion}`
			)
		}
		const response = decoder.decode(source, this.primitiveCodec)

		if (decompressed) {
			this.primitiveCodec.release(source)
		}

		return new Frame(
			protocolVersion,
			beta,
			streamId,
			isTracing,
			tracingId,
			frameSize,
			compressedFrameSize,
			customPayload,
			warnings,
			response
		)
	}

	private readStreamId(source: B): number {
		const id = this.primitiveCodec.readUnsignedShort(source)
		// The protocol spec states that the stream id is a [short], but this is wrong: the stream id
		// is signed. Rather than adding a `readSignedShort` to PrimitiveCodec for this edge case,
		// handle the conversion here.
		return id
	}
}
