import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { InetAddress } from "../../util/InetAddress"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"

export class ReadFailure extends ProtocolError {
	consistencyLevel: number
	received: number
	blockFor: number
	numFailures: number
	reasonMap: Map<InetAddress, number>
	dataPresent: boolean

	constructor(
		message: string,
		consistencyLevel: number,
		received: number,
		blockFor: number,
		numFailures: number,
		reasonMap: Map<InetAddress, number>,
		dataPresent: boolean
	) {
		super(ProtocolConstants.ErrorCode.READ_FAILURE, message)
		this.consistencyLevel = consistencyLevel
		this.received = received
		this.blockFor = blockFor
		this.numFailures = numFailures
		this.reasonMap = reasonMap
		this.dataPresent = dataPresent
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.READ_FAILURE, protocolVersion)
		}

		encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void {
			const readFailure = error as ReadFailure
			encoder.writeString(readFailure.message, dest)
			encoder.writeUnsignedShort(readFailure.consistencyLevel, dest)
			encoder.writeInt(readFailure.received, dest)
			encoder.writeInt(readFailure.blockFor, dest)
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				ReadFailure.SubCodec.writeReasonMap(
					readFailure.reasonMap,
					dest,
					encoder
				)
			} else {
				encoder.writeInt(readFailure.numFailures, dest)
			}
			encoder.writeByte(readFailure.dataPresent ? 1 : 0, dest)
		}

		encodedSize(error: ProtocolError): number {
			const readFailure = error as ReadFailure
			let size =
				PrimitiveSizes.sizeOfString(readFailure.message) +
				PrimitiveSizes.SHORT + // consistencyLevel
				PrimitiveSizes.INT + // received
				PrimitiveSizes.INT + // blockFor
				PrimitiveSizes.BYTE // dataPresent
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				size += ReadFailure.SubCodec.sizeOfReasonMap(readFailure.reasonMap)
			} else {
				size += PrimitiveSizes.INT // numFailures
			}
			return size
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const consistencyLevel = decoder.readUnsignedShort(source)
			const received = decoder.readInt(source)
			const blockFor = decoder.readInt(source)
			let numFailures: number
			let reasonMap: Map<InetAddress, number>
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				reasonMap = ReadFailure.SubCodec.readReasonMap(source, decoder)
				numFailures = reasonMap.size
			} else {
				reasonMap = new Map<InetAddress, number>()
				numFailures = decoder.readInt(source)
			}
			const dataPresent = decoder.readByte(source) !== 0
			return new ReadFailure(
				message,
				consistencyLevel,
				received,
				blockFor,
				numFailures,
				reasonMap,
				dataPresent
			)
		}

		static writeReasonMap<B>(
			m: Map<InetAddress, number>,
			dest: B,
			encoder: PrimitiveCodec<B>
		): void {
			encoder.writeInt(m.size, dest)
			for (const entry of m.entries()) {
				encoder.writeInetAddr(entry[0], dest)
				encoder.writeUnsignedShort(entry[1], dest)
			}
		}

		static sizeOfReasonMap(m: Map<InetAddress, number>): number {
			let size = PrimitiveSizes.INT
			for (const entry of m.entries()) {
				size += PrimitiveSizes.sizeOfInetAddr(entry[0])
				size += PrimitiveSizes.SHORT
			}
			return size
		}

		static readReasonMap<B>(
			source: B,
			decoder: PrimitiveCodec<B>
		): Map<InetAddress, number> {
			const size = decoder.readInt(source)
			if (size === 0) {
				return new Map<InetAddress, number>()
			} else {
				const builder = new Map<InetAddress, number>()
				for (let i = 0; i < size; i++) {
					const key = decoder.readInetAddr(source)
					const value = decoder.readUnsignedShort(source)
					builder.set(key, value)
				}
				return builder
			}
		}
	}
}
