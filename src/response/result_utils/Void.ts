import { PrimitiveCodec } from "../../PrimitiveCodec"
import { ProtocolMessage } from "../../ProtocolMessage"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { Result, ResultSubCodec } from "../Result"

export class VoidResult extends Result {
	public static readonly INSTANCE = new VoidResult()

	private constructor() {
		super(ProtocolConstants.ResultKind.VOID)
	}

	toString(): string {
		return "VOID"
	}

	static SubCodec = class extends ResultSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ResultKind.VOID, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {}

		encodedSize(message: ProtocolMessage): number {
			return 0
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			return VoidResult.INSTANCE
		}
	}
}
