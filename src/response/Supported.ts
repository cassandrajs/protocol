import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"

export class Supported extends ProtocolMessage {
	options: { [key: string]: string[] }

	constructor(options: { [key: string]: string[] }) {
		super(true, ProtocolConstants.Opcode.SUPPORTED)
		this.options = options
	}

	toString(): string {
		return "SUPPORTED " + JSON.stringify(this.options)
	}

	static Codec = class extends ProtocolMessageCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.Opcode.SUPPORTED, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const supported = message as Supported
			encoder.writeStringMultimap(supported.options, dest)
		}

		encodedSize(message: ProtocolMessage): number {
			const supported = message as Supported
			return PrimitiveSizes.sizeOfStringMultimap(supported.options)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const options = decoder.readStringMultimap(source)
			return new Supported(options)
		}
	}
}
