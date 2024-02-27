import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"

export class WriteTimeout extends ProtocolError {
	consistencyLevel: number
	received: number
	blockFor: number
	writeType: string

	constructor(
		message: string,
		consistencyLevel: number,
		received: number,
		blockFor: number,
		writeType: string
	) {
		super(ProtocolConstants.ErrorCode.WRITE_TIMEOUT, message)
		this.consistencyLevel = consistencyLevel
		this.received = received
		this.blockFor = blockFor
		this.writeType = writeType
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.WRITE_TIMEOUT, protocolVersion)
		}

		encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void {
			const writeTimeout = error as WriteTimeout
			encoder.writeString(writeTimeout.message, dest)
			encoder.writeUnsignedShort(writeTimeout.consistencyLevel, dest)
			encoder.writeInt(writeTimeout.received, dest)
			encoder.writeInt(writeTimeout.blockFor, dest)
			encoder.writeString(writeTimeout.writeType, dest)
		}

		encodedSize(error: ProtocolError): number {
			const writeTimeout = error as WriteTimeout
			return (
				PrimitiveSizes.sizeOfString(writeTimeout.message) +
				PrimitiveSizes.SHORT +
				PrimitiveSizes.INT +
				PrimitiveSizes.INT +
				PrimitiveSizes.sizeOfString(writeTimeout.writeType)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const consistencyLevel = decoder.readUnsignedShort(source)
			const received = decoder.readInt(source)
			const blockFor = decoder.readInt(source)
			const writeType = decoder.readString(source)
			return new WriteTimeout(
				message,
				consistencyLevel,
				received,
				blockFor,
				writeType
			)
		}
	}
}
