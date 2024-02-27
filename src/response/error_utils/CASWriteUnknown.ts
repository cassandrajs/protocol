import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"

export class CASWriteUnknown extends ProtocolError {
	consistencyLevel: number
	received: number
	blockFor: number

	constructor(
		message: string,
		consistencyLevel: number,
		received: number,
		blockFor: number
	) {
		super(ProtocolConstants.ErrorCode.CAS_WRITE_UNKNOWN, message)
		this.consistencyLevel = consistencyLevel
		this.received = received
		this.blockFor = blockFor
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.CAS_WRITE_UNKNOWN, protocolVersion)
		}

		encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void {
			const casWriteUnknown = error as CASWriteUnknown
			encoder.writeString(casWriteUnknown.message, dest)
			encoder.writeUnsignedShort(casWriteUnknown.consistencyLevel, dest)
			encoder.writeInt(casWriteUnknown.received, dest)
			encoder.writeInt(casWriteUnknown.blockFor, dest)
		}

		encodedSize(error: ProtocolError): number {
			const casWriteUnknown = error as CASWriteUnknown
			return (
				PrimitiveSizes.sizeOfString(casWriteUnknown.message) +
				PrimitiveSizes.SHORT +
				PrimitiveSizes.INT +
				PrimitiveSizes.INT
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const consistencyLevel = decoder.readUnsignedShort(source)
			const received = decoder.readInt(source)
			const blockFor = decoder.readInt(source)
			return new CASWriteUnknown(message, consistencyLevel, received, blockFor)
		}
	}
}
