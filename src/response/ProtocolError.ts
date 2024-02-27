import { IllegalArgumentError } from "../errors/IllegalArgumentError"
import { PrimitiveCodec } from "../PrimitiveCodec"
import { PrimitiveSizes } from "../PrimitiveSizes"
import { ProtocolMessage } from "../ProtocolMessage"
import { ProtocolMessageCodec } from "../ProtocolMessageCodec"
import { IntMap } from "../util/IntMap"
import { ProtocolConstants, ProtocolVersion } from "../util/ProtocolConstants"
import { AlreadyExists } from "./error_utils/AlreadyExists"
import { CASWriteUnknown } from "./error_utils/CASWriteUnknown"
import { FunctionFailure } from "./error_utils/FunctionFailure"
import { ReadFailure } from "./error_utils/ReadFailure"
import { ReadTimeout } from "./error_utils/ReadTimeout"
import { Unavailable } from "./error_utils/Unavailable"
import { Unprepared } from "./error_utils/Unprepared"
import { WriteFailure } from "./error_utils/WriteFailure"
import { WriteTimeout } from "./error_utils/WriteTimeout"

export class ProtocolErrorSubCodec {
	errorCode: number
	protocolVersion: ProtocolVersion

	constructor(errorCode: number, protocolVersion: ProtocolVersion) {
		this.errorCode = errorCode
		this.protocolVersion = protocolVersion
	}

	encode<B>(
		dest: B,
		message: ProtocolMessage,
		encoder: PrimitiveCodec<B>
	): void {
		throw new Error("Method not implemented")
	}

	encodedSize(message: ProtocolMessage): number {
		throw new Error("Method not implemented")
	}

	decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
		throw new Error("Method not implemented")
	}
}

class SingleMessageSubCodec extends ProtocolErrorSubCodec {
	constructor(errorCode: number, protocolVersion: ProtocolVersion) {
		super(errorCode, protocolVersion)
	}

	encode<B>(
		dest: B,
		message: ProtocolMessage,
		encoder: PrimitiveCodec<B>
	): void {
		const error = message as ProtocolError
		encoder.writeString(error.message, dest)
	}

	encodedSize(message: ProtocolMessage): number {
		const error = message as ProtocolError
		return PrimitiveSizes.sizeOfString(error.message)
	}

	decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
		const message = decoder.readString(source)
		return new ProtocolError(this.errorCode, message)
	}
}

export class ProtocolError extends ProtocolMessage {
	code: number
	message: string

	constructor(code: number, message: string) {
		super(true, ProtocolConstants.Opcode.ERROR)
		this.code = code
		this.message = message
	}

	toString(): string {
		return `ERROR(${this.message})`
	}

	static Codec = class extends ProtocolMessageCodec {
		subCodecs: IntMap<ProtocolErrorSubCodec>

		constructor(
			protocolVersion: ProtocolVersion,
			...subCodecs: ProtocolErrorSubCodec[]
		) {
			super(ProtocolConstants.Opcode.ERROR, protocolVersion)

			if (!subCodecs || subCodecs.length == 0) {
				subCodecs = [
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.SERVER_ERROR,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.PROTOCOL_ERROR,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.AUTH_ERROR,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.OVERLOADED,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.IS_BOOTSTRAPPING,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.TRUNCATE_ERROR,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.SYNTAX_ERROR,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.UNAUTHORIZED,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.INVALID,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.CONFIG_ERROR,
						protocolVersion
					),
					new SingleMessageSubCodec(
						ProtocolConstants.ErrorCode.CDC_WRITE_FAILURE,
						protocolVersion
					),
					new Unavailable.SubCodec(protocolVersion),
					new WriteTimeout.SubCodec(protocolVersion),
					new ReadTimeout.SubCodec(protocolVersion),
					new ReadFailure.SubCodec(protocolVersion),
					new FunctionFailure.SubCodec(protocolVersion),
					new WriteFailure.SubCodec(protocolVersion),
					new AlreadyExists.SubCodec(protocolVersion),
					new Unprepared.SubCodec(protocolVersion),
					new CASWriteUnknown.SubCodec(protocolVersion),
				]
			}

			this.subCodecs = new IntMap<ProtocolErrorSubCodec>()

			subCodecs.forEach((subCodec) => {
				this.subCodecs.set(subCodec.errorCode, subCodec)
			})
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const error = message as ProtocolError
			encoder.writeInt(error.code, dest)
			this.getSubCodec(error.code).encode(dest, message, encoder)
		}

		encodedSize(message: ProtocolMessage): number {
			const error = message as ProtocolError
			return (
				PrimitiveSizes.INT + this.getSubCodec(error.code).encodedSize(message)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const errorCode = decoder.readInt(source)
			return this.getSubCodec(errorCode).decode(source, decoder)
		}

		getSubCodec(errorCode: number): ProtocolErrorSubCodec {
			const subCodec = this.subCodecs.get(errorCode)
			if (!subCodec) {
				throw new IllegalArgumentError(`Unsupported error code: ${errorCode}`)
			}
			return subCodec
		}
	}

	static SubCodec = ProtocolErrorSubCodec

	static SingleMessageSubCodec = SingleMessageSubCodec
}
