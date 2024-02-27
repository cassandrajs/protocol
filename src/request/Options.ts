import { PrimitiveCodec } from "../PrimitiveCodec"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"

export class Options extends ProtocolMessage {
	static INSTANCE: Options = new Options()

	private constructor() {
		super(false, ProtocolConstants.Opcode.OPTIONS)
	}

	toString(): string {
		return "OPTIONS"
	}

	static Codec = class extends ProtocolMessageCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.Opcode.OPTIONS, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			// nothing to do
		}

		encodedSize(message: ProtocolMessage): number {
			return 0
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			return Options.INSTANCE
		}
	}
}
