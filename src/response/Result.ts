import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { IntMap, IntMapBuilder } from "../util/IntMap"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"
import { DefaultRows } from "./result_utils/DefaultRows"
import { Prepared } from "./result_utils/Prepared"
import { SchemaChange } from "./result_utils/SchemaChange"
import { SetKeyspace } from "./result_utils/SetKeyspace"
import { VoidResult } from "./result_utils/Void"

export class ResultSubCodec {
	kind: number
	protocolVersion: ProtocolVersion

	protected constructor(kind: number, protocolVersion: ProtocolVersion) {
		this.kind = kind
		this.protocolVersion = protocolVersion
	}

	encode<B>(
		dest: B,
		message: ProtocolMessage,
		encoder: PrimitiveCodec<B>
	): void {
		throw new Error("Method not implemented.")
	}

	encodedSize(message: ProtocolMessage): number {
		throw new Error("Method not implemented.")
	}

	decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
		throw new Error("Method not implemented.")
	}
}

export abstract class Result extends ProtocolMessage {
	kind: number

	protected constructor(kind: number) {
		super(true, ProtocolConstants.Opcode.RESULT)
		this.kind = kind
	}

	static Codec = class extends ProtocolMessageCodec {
		subDecoders: IntMap<ResultSubCodec>

		constructor(
			protocolVersion: ProtocolVersion,
			...subCodecs: ResultSubCodec[]
		) {
			super(ProtocolConstants.Opcode.RESULT, protocolVersion)

			if (!subCodecs || subCodecs.length == 0) {
				subCodecs = [
					new VoidResult.SubCodec(protocolVersion),
					new DefaultRows.SubCodec(protocolVersion),
					new SetKeyspace.SubCodec(protocolVersion),
					new Prepared.SubCodec(protocolVersion),
					new SchemaChange.SubCodec(protocolVersion),
				]
			}

			const builder = new IntMapBuilder<ResultSubCodec>()
			for (const subCodec of subCodecs) {
				builder.put(subCodec.kind, subCodec)
			}
			this.subDecoders = builder.build()
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const result = message as Result
			encoder.writeInt(result.kind, dest)
			this.getSubCodec(result.kind).encode(dest, result, encoder)
		}

		encodedSize(message: ProtocolMessage): number {
			const result = message as Result
			return (
				PrimitiveSizes.INT + this.getSubCodec(result.kind).encodedSize(result)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const kind = decoder.readInt(source)
			return this.getSubCodec(kind).decode(source, decoder)
		}

		getSubCodec(kind: number): ResultSubCodec {
			const subCodec = this.subDecoders.get(kind)
			if (!subCodec) {
				throw new Error(`Unsupported result kind: ${kind}`)
			}
			return subCodec
		}
	}

	static SubCodec = ResultSubCodec
}
