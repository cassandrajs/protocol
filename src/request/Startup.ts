import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"

export class Startup extends ProtocolMessage {
	static CQL_VERSION_KEY: string = "CQL_VERSION"
	static COMPRESSION_KEY: string = "COMPRESSION"
	static CQL_VERSION: string = "3.0.0"

	options: { [key: string]: string }

	constructor(options?: string | { [key: string]: string }) {
		super(false, ProtocolConstants.Opcode.STARTUP)

		if (typeof options === "string") {
			const compressionAlgorithm = options
			if (compressionAlgorithm === null || compressionAlgorithm === "") {
				options = {}
				options[Startup.CQL_VERSION_KEY] = Startup.CQL_VERSION
			} else {
				options = {}
				options[Startup.CQL_VERSION_KEY] = Startup.CQL_VERSION
				options[Startup.COMPRESSION_KEY] = compressionAlgorithm
			}
		}

		if (typeof options !== "object") {
			options = {}
			options[Startup.CQL_VERSION_KEY] = Startup.CQL_VERSION
		}

		if (!options[Startup.CQL_VERSION_KEY]) {
			const inOptions = options
			options = {}
			options[Startup.CQL_VERSION_KEY] = Startup.CQL_VERSION
			options = { ...options, ...inOptions }
		}

		this.options = options
	}

	toString(): string {
		return `STARTUP ${this.options}`
	}

	static Codec = class extends ProtocolMessageCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.Opcode.STARTUP, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const startup = message as Startup
			encoder.writeStringMap(startup.options, dest)
		}

		encodedSize(message: ProtocolMessage): number {
			const startup = message as Startup
			return PrimitiveSizes.sizeOfStringMap(startup.options)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const map: { [key: string]: string } = decoder.readStringMap(source)
			return new Startup(map)
		}
	}
}
