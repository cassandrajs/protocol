import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"
import { QueryOptions, QueryOptionsCodec } from "./query_utils/QueryOptions"

export class Query extends ProtocolMessage {
	query: string
	options: QueryOptions

	constructor(query: string, options: QueryOptions = QueryOptions.DEFAULT) {
		super(false, ProtocolConstants.Opcode.QUERY)
		this.query = query
		this.options = options
	}

	toString(): string {
		return `QUERY (${this.query})`
	}

	static Codec = class extends ProtocolMessageCodec {
		optionsCodec: QueryOptionsCodec

		constructor(
			protocolVersion: ProtocolVersion,
			optionsCodec?: QueryOptionsCodec
		) {
			super(ProtocolConstants.Opcode.QUERY, protocolVersion)
			this.optionsCodec =
				optionsCodec ?? new QueryOptions.Codec(protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const query = message as Query
			encoder.writeLongString(query.query, dest)
			this.optionsCodec.encode(dest, query.options, encoder)
		}

		encodedSize(message: ProtocolMessage): number {
			const query = message as Query
			return (
				PrimitiveSizes.sizeOfLongString(query.query) +
				this.optionsCodec.encodedSize(query.options)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const query = decoder.readLongString(source)
			const options = this.optionsCodec.decode(source, decoder)
			return new Query(query, options)
		}
	}
}
