import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { Bytes } from "../util/Bytes"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"
import { QueryOptions, QueryOptionsCodec } from "./query_utils/QueryOptions"

export class Execute extends ProtocolMessage {
	queryId: number[]
	resultMetadataId: number[]
	options: QueryOptions

	constructor(
		queryId: number[],
		resultMetadataId: number[],
		options: QueryOptions
	) {
		super(false, ProtocolConstants.Opcode.EXECUTE)
		this.queryId = queryId
		this.resultMetadataId = resultMetadataId
		this.options = options
	}

	toString(): string {
		return `EXECUTE(${Bytes.toHexString(this.queryId)})`
	}

	static Codec = class extends ProtocolMessageCodec {
		optionsCodec: QueryOptionsCodec

		constructor(
			protocolVersion: ProtocolVersion,
			optionsCodec?: QueryOptionsCodec
		) {
			super(ProtocolConstants.Opcode.EXECUTE, protocolVersion)
			this.optionsCodec =
				optionsCodec || new QueryOptions.Codec(protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const execute = message as Execute
			encoder.writeShortBytes(execute.queryId, dest)
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				encoder.writeShortBytes(execute.resultMetadataId, dest)
			}
			this.optionsCodec.encode(dest, execute.options, encoder)
		}

		encodedSize(message: ProtocolMessage): number {
			const execute = message as Execute
			let size = PrimitiveSizes.sizeOfShortBytes(execute.queryId)
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				if (execute.resultMetadataId) {
					size += PrimitiveSizes.sizeOfShortBytes(execute.resultMetadataId)
				}
			}
			size += this.optionsCodec.encodedSize(execute.options)
			return size
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const queryId = decoder.readShortBytes(source)
			const resultMetadataId =
				this.protocolVersion >= ProtocolConstants.Version.V5
					? decoder.readShortBytes(source)
					: null
			const options = this.optionsCodec.decode(source, decoder)
			return new Execute(queryId, resultMetadataId, options)
		}
	}
}
