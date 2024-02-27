import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"

export class FunctionFailure extends ProtocolError {
	keyspace: string
	function: string
	argTypes: string[]

	constructor(
		message: string,
		keyspace: string,
		func: string,
		argTypes: string[]
	) {
		super(ProtocolConstants.ErrorCode.FUNCTION_FAILURE, message)
		this.keyspace = keyspace
		this.function = func
		this.argTypes = argTypes
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.FUNCTION_FAILURE, protocolVersion)
		}

		encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void {
			const functionFailure = error as FunctionFailure
			encoder.writeString(functionFailure.message, dest)
			encoder.writeString(functionFailure.keyspace, dest)
			encoder.writeString(functionFailure.function, dest)
			encoder.writeStringList(functionFailure.argTypes, dest)
		}

		encodedSize(error: ProtocolError): number {
			const functionFailure = error as FunctionFailure
			return (
				PrimitiveSizes.sizeOfString(functionFailure.message) +
				PrimitiveSizes.sizeOfString(functionFailure.keyspace) +
				PrimitiveSizes.sizeOfString(functionFailure.function) +
				PrimitiveSizes.sizeOfStringList(functionFailure.argTypes)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const keyspace = decoder.readString(source)
			const func = decoder.readString(source)
			const argTypes = decoder.readStringList(source)
			return new FunctionFailure(message, keyspace, func, argTypes)
		}
	}
}
