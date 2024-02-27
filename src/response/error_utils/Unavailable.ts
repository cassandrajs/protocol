import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"

export class Unavailable extends ProtocolError {
	consistencyLevel: number
	required: number
	alive: number

	constructor(
		message: string,
		consistencyLevel: number,
		required: number,
		alive: number
	) {
		super(ProtocolConstants.ErrorCode.UNAVAILABLE, message)
		this.consistencyLevel = consistencyLevel
		this.required = required
		this.alive = alive
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.UNAVAILABLE, protocolVersion)
		}

		encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void {
			const unavailable = error as Unavailable
			encoder.writeString(unavailable.message, dest)
			encoder.writeUnsignedShort(unavailable.consistencyLevel, dest)
			encoder.writeInt(unavailable.required, dest)
			encoder.writeInt(unavailable.alive, dest)
		}

		encodedSize(error: ProtocolError): number {
			const unavailable = error as Unavailable
			return (
				PrimitiveSizes.sizeOfString(unavailable.message) +
				PrimitiveSizes.SHORT +
				PrimitiveSizes.INT +
				PrimitiveSizes.INT
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const consistencyLevel = decoder.readUnsignedShort(source)
			const required = decoder.readInt(source)
			const alive = decoder.readInt(source)
			return new Unavailable(message, consistencyLevel, required, alive)
		}
	}
}
