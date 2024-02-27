import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import {
	Opcode,
	ProtocolConstants,
	ProtocolVersion,
} from "../util/ProtocolConstants"

export class Register extends ProtocolMessage {
	eventTypes: string[]

	constructor(eventTypes: string[]) {
		super(false, ProtocolConstants.Opcode.REGISTER)
		this.eventTypes = eventTypes
	}

	toString(): string {
		return "REGISTER " + this.eventTypes
	}

	static Codec = class extends ProtocolMessageCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.Opcode.REGISTER, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			let register = message as Register
			encoder.writeStringList(register.eventTypes, dest)
		}

		encodedSize(message: ProtocolMessage): number {
			let register = message as Register
			return PrimitiveSizes.sizeOfStringList(register.eventTypes)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			return new Register(decoder.readStringList(source))
		}
	}
}
