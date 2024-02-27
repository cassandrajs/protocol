import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"

export class AlreadyExists extends ProtocolError {
	keyspace: string
	table: string

	constructor(message: string, keyspace: string, table: string) {
		super(ProtocolConstants.ErrorCode.ALREADY_EXISTS, message)
		this.keyspace = keyspace
		this.table = table
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.ALREADY_EXISTS, protocolVersion)
		}

		encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void {
			const alreadyExists = error as AlreadyExists
			encoder.writeString(alreadyExists.message, dest)
			encoder.writeString(alreadyExists.keyspace, dest)
			encoder.writeString(alreadyExists.table, dest)
		}

		encodedSize(error: ProtocolError): number {
			const alreadyExists = error as AlreadyExists
			return (
				PrimitiveSizes.sizeOfString(alreadyExists.message) +
				PrimitiveSizes.sizeOfString(alreadyExists.keyspace) +
				PrimitiveSizes.sizeOfString(alreadyExists.table)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const keyspace = decoder.readString(source)
			const table = decoder.readString(source)
			return new AlreadyExists(message, keyspace, table)
		}
	}
}
