import { IllegalArgumentError } from "../../errors/IllegalArgumentError"
import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { ProtocolMessage } from "../../ProtocolMessage"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolEvent, ProtocolEventSubCodec } from "../ProtocolEvent"

export class SchemaChangeEvent extends ProtocolEvent {
	changeType: string
	target: string
	keyspace: string
	object: string | null
	schemaArguments: string[] | null

	constructor(
		changeType: string,
		target: string,
		keyspace: string,
		object: string | null,
		schemaArguments: string[] | null
	) {
		super(ProtocolConstants.EventType.SCHEMA_CHANGE)
		this.changeType = changeType
		this.target = target
		this.keyspace = keyspace
		this.object = object
		this.schemaArguments = schemaArguments
	}

	toString(): string {
		return `EVENT SCHEMA_CHANGE(${this.changeType} ${this.target} ${this.keyspace}${this.object ? "." + this.object : ""}${this.schemaArguments ? this.schemaArguments.join(",") : ""})`
	}

	static SubCodec = class extends ProtocolEventSubCodec {
		constructor(protocolVersion: ProtocolVersion | string) {
			super(
				ProtocolConstants.EventType.SCHEMA_CHANGE,
				protocolVersion as ProtocolVersion
			)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const event = message as SchemaChangeEvent

			encoder.writeString(event.changeType, dest)
			encoder.writeString(event.target, dest)
			encoder.writeString(event.keyspace, dest)

			switch (event.target) {
				case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
					break
				case ProtocolConstants.SchemaChangeTarget.TABLE:
				case ProtocolConstants.SchemaChangeTarget.TYPE:
					encoder.writeString(event.object as string, dest)
					break
				case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
				case ProtocolConstants.SchemaChangeTarget.FUNCTION:
					encoder.writeString(event.object as string, dest)
					encoder.writeStringList(event.schemaArguments as string[], dest)
					break
				default:
					throw new Error(`Unknown schema change target: ${event.target}`)
			}
		}

		encodedSize(message: ProtocolMessage): number {
			const event = message as SchemaChangeEvent

			if (
				!(
					this.protocolVersion >= ProtocolConstants.Version.V4 ||
					(event.target !== ProtocolConstants.SchemaChangeTarget.AGGREGATE &&
						event.target !== ProtocolConstants.SchemaChangeTarget.FUNCTION)
				)
			) {
				throw new IllegalArgumentError(
					`${event.target} schema change events are not supported in protocol version ${this.protocolVersion}`
				)
			}

			let size = PrimitiveSizes.sizeOfString(event.changeType)
			size += PrimitiveSizes.sizeOfString(event.target)
			size += PrimitiveSizes.sizeOfString(event.keyspace)

			switch (event.target) {
				case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
					break
				case ProtocolConstants.SchemaChangeTarget.TABLE:
				case ProtocolConstants.SchemaChangeTarget.TYPE:
					size += PrimitiveSizes.sizeOfString(event.object as string)
					break
				case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
				case ProtocolConstants.SchemaChangeTarget.FUNCTION:
					size += PrimitiveSizes.sizeOfString(event.object as string)
					size += PrimitiveSizes.sizeOfStringList(
						event.schemaArguments as string[]
					)
					break
				default:
					throw new Error(`Unknown schema change target: ${event.target}`)
			}
			return size
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const changeType = decoder.readString(source)
			const target = decoder.readString(source)

			if (
				!(
					this.protocolVersion >= ProtocolConstants.Version.V4 ||
					(target !== ProtocolConstants.SchemaChangeTarget.AGGREGATE &&
						target !== ProtocolConstants.SchemaChangeTarget.FUNCTION)
				)
			) {
				throw new IllegalArgumentError(
					`${target} schema change events are not supported in protocol version ${this.protocolVersion}`
				)
			}

			const keyspace = decoder.readString(source)
			let object: string | null = null
			let schemaArguments: string[] | null = null
			switch (target) {
				case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
					object = null
					schemaArguments = null
					break
				case ProtocolConstants.SchemaChangeTarget.TABLE:
				case ProtocolConstants.SchemaChangeTarget.TYPE:
					object = decoder.readString(source)
					schemaArguments = null
					break
				case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
				case ProtocolConstants.SchemaChangeTarget.FUNCTION:
					object = decoder.readString(source)
					schemaArguments = decoder.readStringList(source)
					break
				default:
					throw new Error(`Unknown schema change target: ${target}`)
			}
			return new SchemaChangeEvent(
				changeType,
				target,
				keyspace,
				object,
				schemaArguments
			)
		}
	}
}
