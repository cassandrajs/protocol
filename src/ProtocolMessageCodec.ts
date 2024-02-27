import { PrimitiveCodec } from "./PrimitiveCodec"
import { ProtocolMessage } from "./ProtocolMessage"
import { Opcode, ProtocolVersion } from "./util/ProtocolConstants"

export class ProtocolMessageCodec {
	opcode: Opcode
	protocolVersion: ProtocolVersion

	constructor(opcode: Opcode, protocolVersion: ProtocolVersion) {
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
