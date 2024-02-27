import { PrimitiveCodec } from "./PrimitiveCodec"
import { ProtocolMessage } from "./ProtocolMessage"
import { Opcode } from "./util/ProtocolConstants"

export class ProtocolCodec {
	opcode: Opcode
	protocolVersion: number

	constructor(opcode: Opcode, protocolVersion: number) {
		this.opcode = opcode
		this.protocolVersion = protocolVersion
	}

	encode<B>(
		dest: B,
		message: ProtocolMessage,
		encoder: PrimitiveCodec<B>
	): void {
		throw new Error("Not implemented")
	}

	encodedSize(message: ProtocolMessage): number {
		throw new Error("Not implemented")
	}

	decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
		throw new Error("Not implemented")
	}
}
