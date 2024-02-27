import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"

export class Unprepared extends ProtocolError {
	id: number[]

	constructor(message: string, id: number[]) {
		super(ProtocolConstants.ErrorCode.UNPREPARED, message)
		this.id = id
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.UNPREPARED, protocolVersion)
		}

		encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void {
			const unprepared = error as Unprepared
			encoder.writeString(unprepared.message, dest)
			encoder.writeShortBytes(unprepared.id, dest)
		}

		encodedSize(error: ProtocolError): number {
			const unprepared = error as Unprepared
			return (
				PrimitiveSizes.sizeOfString(unprepared.message) +
				PrimitiveSizes.sizeOfShortBytes(unprepared.id)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const id = decoder.readShortBytes(source)
			return new Unprepared(message, id)
		}
	}
}
