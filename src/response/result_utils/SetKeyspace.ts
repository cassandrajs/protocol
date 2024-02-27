import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { ProtocolMessage } from "../../ProtocolMessage"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { Result, ResultSubCodec } from "../Result"

export class SetKeyspace extends Result {
	keyspace: string

	constructor(keyspace: string) {
		super(ProtocolConstants.ResultKind.SET_KEYSPACE)
		this.keyspace = keyspace
	}

	toString(): string {
		return `SET_KEYSPACE(${this.keyspace})`
	}

	static SubCodec = class extends ResultSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ResultKind.SET_KEYSPACE, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const setKeyspace = message as SetKeyspace
			encoder.writeString(setKeyspace.keyspace, dest)
		}

		encodedSize(message: ProtocolMessage): number {
			const setKeyspace = message as SetKeyspace
			return PrimitiveSizes.sizeOfString(setKeyspace.keyspace)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const keyspace = decoder.readString(source)
			return new SetKeyspace(keyspace)
		}
	}
}
