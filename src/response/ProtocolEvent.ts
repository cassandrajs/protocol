import { IllegalArgumentError } from "../errors/IllegalArgumentError"
import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"
import { SchemaChangeEvent } from "./event_utils/SchemaChangeEvent"
import { StatusChangeEvent } from "./event_utils/StatusChangeEvent"
import { TopologyChangeEvent } from "./event_utils/TopologyChangeEvent"

export class ProtocolEventSubCodec {
	type: string
	protocolVersion: ProtocolVersion

	constructor(type: string, protocolVersion: ProtocolVersion) {
		this.type = type
		this.protocolVersion = protocolVersion
	}

	encode<B>(
		dest: B,
		message: ProtocolMessage,
		encoder: PrimitiveCodec<B>
	): void {
		// To be implemented in concrete subclasses
	}

	encodedSize(message: ProtocolMessage): number {
		// To be implemented in concrete subclasses
		return -1
	}

	decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
		// To be implemented in concrete subclasses
		return null
	}
}

export abstract class ProtocolEvent extends ProtocolMessage {
	type: string

	protected constructor(type: string) {
		super(true, ProtocolConstants.Opcode.EVENT)
		this.type = type
	}

	static Codec = class extends ProtocolMessageCodec {
		subDecoders: Map<string, ProtocolEventSubCodec>

		constructor(
			protocolVersion: ProtocolVersion,
			...subCodecs: ProtocolEventSubCodec[]
		) {
			super(ProtocolConstants.Opcode.EVENT, protocolVersion)

			if (subCodecs.length == 0) {
				subCodecs = [
					new TopologyChangeEvent.SubCodec(protocolVersion),
					new StatusChangeEvent.SubCodec(protocolVersion),
					new SchemaChangeEvent.SubCodec(protocolVersion),
				]
			}

			const tmp = new Map<string, ProtocolEventSubCodec>()
			subCodecs.forEach((subCodec) => {
				tmp.set(subCodec.type, subCodec)
			})
			this.subDecoders = new Map<string, ProtocolEventSubCodec>(tmp)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const event = message as ProtocolEvent
			encoder.writeString(event.type, dest)
			this.getSubCodec(event.type).encode(dest, message, encoder)
		}

		encodedSize(message: ProtocolMessage): number {
			const event = message as ProtocolEvent
			return (
				PrimitiveSizes.sizeOfString(event.type) +
				this.getSubCodec(event.type).encodedSize(message)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const type: string = decoder.readString(source)
			return this.getSubCodec(type).decode(source, decoder)
		}

		getSubCodec(type: string): ProtocolEventSubCodec {
			const subCodec = this.subDecoders.get(type)
			if (!subCodec) {
				throw new IllegalArgumentError(`Unsupported event type: ${type}`)
			}
			return subCodec
		}
	}

	static SubCodec = ProtocolEventSubCodec
}
