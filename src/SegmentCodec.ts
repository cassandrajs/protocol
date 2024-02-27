import Long from "long"
import { Compressor } from "./Compressor"
import { NoopCompressor } from "./NoopCompressor"
import { PrimitiveCodec } from "./PrimitiveCodec"
import { Segment } from "./Segment"
import { Crc } from "./util/Crc"

export class SegmentCodec<B> {
	private static COMPRESSED_HEADER_LENGTH: number = 5
	private static UNCOMPRESSED_HEADER_LENGTH: number = 3
	public static CRC24_LENGTH: number = 3
	public static CRC32_LENGTH: number = 4
	private primitiveCodec: PrimitiveCodec<B>
	private compressor: Compressor<B>
	private compress: boolean

	constructor(primitiveCodec: PrimitiveCodec<B>, compressor: Compressor<B>) {
		this.primitiveCodec = primitiveCodec
		this.compressor = compressor
		this.compress = !(compressor instanceof NoopCompressor)
	}

	headerLength(): number {
		return this.compress
			? SegmentCodec.COMPRESSED_HEADER_LENGTH
			: SegmentCodec.UNCOMPRESSED_HEADER_LENGTH
	}

	encode(segment: Segment<B>, out: Array<Object>): void {
		const uncompressedPayload: B = segment.payload
		let uncompressedPayloadLength: number =
			this.primitiveCodec.sizeOf(uncompressedPayload)
		if (uncompressedPayloadLength > Segment.MAX_PAYLOAD_LENGTH) {
			throw new Error("Uncompressed payload length exceeds maximum allowed")
		}
		let encodedPayload: B
		if (this.compress) {
			this.primitiveCodec.markReaderIndex(uncompressedPayload)
			const compressedPayload: B =
				this.compressor.compressWithoutLength(uncompressedPayload)
			if (
				this.primitiveCodec.sizeOf(compressedPayload) >=
				uncompressedPayloadLength
			) {
				this.primitiveCodec.resetReaderIndex(uncompressedPayload)
				encodedPayload = uncompressedPayload
				this.primitiveCodec.release(compressedPayload)
				uncompressedPayloadLength = 0
			} else {
				encodedPayload = compressedPayload
				this.primitiveCodec.release(uncompressedPayload)
			}
		} else {
			encodedPayload = uncompressedPayload
		}
		const payloadLength: number = this.primitiveCodec.sizeOf(encodedPayload)
		const header: B = this.encodeHeader(
			payloadLength,
			uncompressedPayloadLength,
			segment.isSelfContained
		)
		let payloadCrc: Long = Crc.computeCrc32(encodedPayload, this.primitiveCodec)
		const trailer: B = this.primitiveCodec.allocate(SegmentCodec.CRC32_LENGTH)
		for (let i: number = 0; i < SegmentCodec.CRC32_LENGTH; i++) {
			this.primitiveCodec.writeByte(payloadCrc.and(0xff).toInt(), trailer)
			payloadCrc = payloadCrc.shiftRight(8)
		}
		out.push(header)
		out.push(encodedPayload)
		out.push(trailer)
	}

	encodeHeader(
		payloadLength: number,
		uncompressedLength: number,
		isSelfContained: boolean
	): B {
		if (payloadLength > Segment.MAX_PAYLOAD_LENGTH) {
			throw new Error("Payload length exceeds maximum allowed")
		}
		let headerLength: number = this.headerLength()
		let headerData: number = payloadLength
		let flagOffset: number = 17
		if (this.compress) {
			headerData |= uncompressedLength << 17
			flagOffset += 17
		}
		if (isSelfContained) {
			headerData |= 1 << flagOffset
		}
		const headerCrc: number = Crc.computeCrc24(headerData, headerLength)
		const header: B = this.primitiveCodec.allocate(
			headerLength + SegmentCodec.CRC24_LENGTH
		)
		for (let i: number = 0; i < headerLength; i++) {
			const shift: number = i * 8
			this.primitiveCodec.writeByte((headerData >> shift) & 0xff, header)
		}
		for (let i: number = 0; i < SegmentCodec.CRC24_LENGTH; i++) {
			const shift: number = i * 8
			this.primitiveCodec.writeByte((headerCrc >> shift) & 0xff, header)
		}
		return header
	}

	decodeHeader(source: B): Header {
		const headerLength: number = this.headerLength()
		if (
			this.primitiveCodec.sizeOf(source) <
			headerLength + SegmentCodec.CRC24_LENGTH
		) {
			throw new Error("Not enough bytes to decode header")
		}
		let headerData: number = 0
		for (let i: number = 0; i < headerLength; i++) {
			headerData |= this.primitiveCodec.readByte(source) << (8 * i)
		}
		let expectedHeaderCrc: number = 0
		for (let i: number = 0; i < SegmentCodec.CRC24_LENGTH; i++) {
			expectedHeaderCrc |= this.primitiveCodec.readByte(source) << (8 * i)
		}
		const actualHeaderCrc: number = Crc.computeCrc24(headerData, headerLength)
		if (actualHeaderCrc !== expectedHeaderCrc) {
			throw new Error("CRC mismatch on header.")
		}
		let payloadLength: number = headerData & Segment.MAX_PAYLOAD_LENGTH
		headerData >>= 17
		let uncompressedPayloadLength: number = this.compress
			? headerData & Segment.MAX_PAYLOAD_LENGTH
			: -1
		let isSelfContained: boolean = (headerData & 1) === 1
		return new Header(payloadLength, uncompressedPayloadLength, isSelfContained)
	}

	decode(header: Header, source: B): Segment<B> {
		if (
			this.primitiveCodec.sizeOf(source) !==
			header.payloadLength + SegmentCodec.CRC32_LENGTH
		) {
			throw new Error("Invalid source size for decoding payload")
		}
		const encodedPayload: B = this.primitiveCodec.readRetainedSlice(
			source,
			header.payloadLength
		)
		let expectedPayloadCrc: Long = Long.ZERO
		for (let i: number = 0; i < SegmentCodec.CRC32_LENGTH; i++) {
			let value = Long.fromNumber(this.primitiveCodec.readByte(source)) // Ensure you're working with Long
			value = value.shiftLeft(8 * i) // Shift left
			expectedPayloadCrc = expectedPayloadCrc.or(value) // Combine with OR
		}
		this.primitiveCodec.release(source)
		const actualPayloadCrc: Long = Crc.computeCrc32(
			encodedPayload,
			this.primitiveCodec
		)
		if (actualPayloadCrc !== expectedPayloadCrc) {
			this.primitiveCodec.release(encodedPayload)
			throw new Error("CRC mismatch on payload")
		}
		let payload: B
		if (this.compress && header.uncompressedPayloadLength > 0) {
			payload = this.compressor.decompressWithoutLength(
				encodedPayload,
				header.uncompressedPayloadLength
			)
			this.primitiveCodec.release(encodedPayload)
		} else {
			payload = encodedPayload
		}
		return new Segment(payload, header.isSelfContained)
	}
}

export class Header {
	payloadLength: number
	uncompressedPayloadLength: number
	isSelfContained: boolean

	constructor(
		payloadLength: number,
		uncompressedPayloadLength: number,
		isSelfContained: boolean
	) {
		this.payloadLength = payloadLength
		this.uncompressedPayloadLength = uncompressedPayloadLength
		this.isSelfContained = isSelfContained
	}
}
