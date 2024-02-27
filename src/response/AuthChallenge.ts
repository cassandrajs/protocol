import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"

export class AuthChallenge extends ProtocolMessage {
	token: Uint8Array

	constructor(token: Uint8Array) {
		super(true, ProtocolConstants.Opcode.AUTH_CHALLENGE)
		this.token = token
	}

	toString(): string {
		return "AUTH_CHALLENGE"
	}

	static Codec = class extends ProtocolMessageCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.Opcode.AUTH_CHALLENGE, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const authChallenge = message as AuthChallenge
			encoder.writeBytes(authChallenge.token, dest)
		}

		encodedSize(message: ProtocolMessage): number {
			const authChallenge = message as AuthChallenge
			return PrimitiveSizes.sizeOfBytes(authChallenge.token)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			return new AuthChallenge(decoder.readBytes(source))
		}
	}
}
