import { PrimitiveCodec } from "../PrimitiveCodec"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"

export class Ready extends ProtocolMessage {
	constructor() {
		super(true, ProtocolConstants.Opcode.READY)
	}

	toString(): string {
		return "READY"
	}

	static Codec = class extends ProtocolMessageCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.Opcode.READY, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {}

		encodedSize(message: ProtocolMessage): number {
			return 0
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			return new Ready()
		}
	}
}
