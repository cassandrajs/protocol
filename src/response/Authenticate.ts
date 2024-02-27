import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"

export class Authenticate extends ProtocolMessage {
	authenticator: string

	constructor(authenticator: string) {
		super(true, ProtocolConstants.Opcode.AUTHENTICATE)
		this.authenticator = authenticator
	}

	toString(): string {
		return "AUTHENTICATE"
	}

	static Codec = class extends ProtocolMessageCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.Opcode.AUTHENTICATE, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const authenticate = message as Authenticate
			encoder.writeString(authenticate.authenticator, dest)
		}

		encodedSize(message: ProtocolMessage): number {
			const authenticate = message as Authenticate
			return PrimitiveSizes.sizeOfString(authenticate.authenticator)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			return new Authenticate(decoder.readString(source))
		}
	}
}
