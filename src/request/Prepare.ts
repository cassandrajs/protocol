import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"

export class Prepare extends ProtocolMessage {
	cqlQuery: string
	keyspace: string | null

	constructor(cqlQuery: string, keyspace: string | null) {
		super(false, ProtocolConstants.Opcode.PREPARE)
		this.cqlQuery = cqlQuery
		this.keyspace = keyspace
	}

	toString(): string {
		return `PREPARE(${this.cqlQuery}, ${this.keyspace})`
	}

	static Codec = class extends ProtocolMessageCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.Opcode.PREPARE, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const prepare = message as Prepare
			encoder.writeLongString(prepare.cqlQuery, dest)
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				// There is only one PREPARE flag for now, so hard-code for simplicity:
				encoder.writeInt(prepare.keyspace ? 0x01 : 0x00, dest)
				if (prepare.keyspace) {
					encoder.writeString(prepare.keyspace, dest)
				}
			}
		}

		encodedSize(message: ProtocolMessage): number {
			const prepare = message as Prepare
			let size = PrimitiveSizes.sizeOfLongString(prepare.cqlQuery)
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				size += PrimitiveSizes.INT // flags
				if (prepare.keyspace) {
					size += PrimitiveSizes.sizeOfString(prepare.keyspace)
				}
			}
			return size
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const cqlQuery = decoder.readLongString(source)
			let keyspace: string | null = null
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				const flags = decoder.readInt(source)
				if (flags & 0x01) {
					keyspace = decoder.readString(source)
				}
			}
			return new Prepare(cqlQuery, keyspace)
		}
	}
}
