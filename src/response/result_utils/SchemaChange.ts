import { IllegalArgumentError } from "../../errors/IllegalArgumentError"
import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { ProtocolMessage } from "../../ProtocolMessage"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { Result, ResultSubCodec } from "../Result"

export class SchemaChange extends Result {
	changeType: string
	target: string
	keyspace: string
	object: string | null
	arguments: string[] | null

	constructor(
		changeType: string,
		target: string,
		keyspace: string,
		object: string | null,
		args: string[] | null
	) {
		super(ProtocolConstants.ResultKind.SCHEMA_CHANGE)
		this.changeType = changeType
		this.target = target
		this.keyspace = keyspace
		this.object = object
		this.arguments = args
	}

	toString(): string {
		return `SCHEMA_CHANGE(${this.changeType} ${this.target} ${this.keyspace}${this.object ? "." + this.object : ""}${this.arguments && this.arguments.length > 0 ? this.arguments.join(",") : ""})`
	}

	static SubCodec = class extends ResultSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ResultKind.SCHEMA_CHANGE, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const schemaChange = message as SchemaChange

			encoder.writeString(schemaChange.changeType, dest)
			encoder.writeString(schemaChange.target, dest)
			encoder.writeString(schemaChange.keyspace, dest)

			switch (schemaChange.target) {
				case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
					break
				case ProtocolConstants.SchemaChangeTarget.TABLE:
				case ProtocolConstants.SchemaChangeTarget.TYPE:
					encoder.writeString(schemaChange.object!, dest)
					break
				case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
				case ProtocolConstants.SchemaChangeTarget.FUNCTION:
					encoder.writeString(schemaChange.object!, dest)
					encoder.writeStringList(schemaChange.arguments!, dest)
					break
				default:
					throw new IllegalArgumentError(
						`Unknown schema change target: ${schemaChange.target}`
					)
			}
		}

		encodedSize(message: ProtocolMessage): number {
			const schemaChange = message as SchemaChange

			let size = PrimitiveSizes.sizeOfString(schemaChange.changeType)
			size += PrimitiveSizes.sizeOfString(schemaChange.target)
			size += PrimitiveSizes.sizeOfString(schemaChange.keyspace)

			switch (schemaChange.target) {
				case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
					break
				case ProtocolConstants.SchemaChangeTarget.TABLE:
				case ProtocolConstants.SchemaChangeTarget.TYPE:
					size += PrimitiveSizes.sizeOfString(schemaChange.object!)
					break
				case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
				case ProtocolConstants.SchemaChangeTarget.FUNCTION:
					size += PrimitiveSizes.sizeOfString(schemaChange.object!)
					size += PrimitiveSizes.sizeOfStringList(schemaChange.arguments!)
					break
				default:
					throw new IllegalArgumentError(
						`Unknown schema change target: ${schemaChange.target}`
					)
			}
			return size
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const changeType = decoder.readString(source)
			const target = decoder.readString(source)
			const keyspace = decoder.readString(source)
			let object: string | null = null
			let args: string[] | null = null

			switch (target) {
				case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
					break
				case ProtocolConstants.SchemaChangeTarget.TABLE:
				case ProtocolConstants.SchemaChangeTarget.TYPE:
					object = decoder.readString(source)
					break
				case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
				case ProtocolConstants.SchemaChangeTarget.FUNCTION:
					object = decoder.readString(source)
					args = decoder.readStringList(source)
					break
				default:
					throw new IllegalArgumentError(
						`Unknown schema change target: ${target}`
					)
			}
			return new SchemaChange(changeType, target, keyspace, object, args)
		}
	}
}
