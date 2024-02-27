import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"

export class AuthSuccess extends ProtocolMessage {
	token: Uint8Array

	constructor(token: Uint8Array) {
		super(true, ProtocolConstants.Opcode.AUTH_SUCCESS)
		this.token = token
	}

	toString(): string {
		return "AUTH_SUCCESS"
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
			const authSuccess = message as AuthSuccess
			encoder.writeBytes(authSuccess.token, dest)
		}

		encodedSize(message: ProtocolMessage): number {
			const authSuccess = message as AuthSuccess
			return PrimitiveSizes.sizeOfBytes(authSuccess.token)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			return new AuthSuccess(decoder.readBytes(source))
		}
	}
}
