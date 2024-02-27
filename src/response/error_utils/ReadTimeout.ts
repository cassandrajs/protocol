import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"

export class ReadTimeout extends ProtocolError {
	/** The consistency level of the query that triggered the exception. */
	consistencyLevel: number
	/** The number of nodes having answered the request. */
	received: number
	/**
	 * The number of replicas whose response is required to achieve {@code consistencyLevel}.
	 *
	 * <p>It is possible to have {@code received >= blockFor} if {@code data_present} is false. Also
	 * in the (unlikely) case where {@code consistencyLevel} is achieved but the coordinator node
	 * times out while waiting for read-repair acknowledgement.
	 */
	blockFor: number
	/** Whether the replica that was asked for data responded. */
	dataPresent: boolean

	constructor(
		message: string,
		consistencyLevel: number,
		received: number,
		blockFor: number,
		dataPresent: boolean
	) {
		super(ProtocolConstants.ErrorCode.READ_TIMEOUT, message)
		this.consistencyLevel = consistencyLevel
		this.received = received
		this.blockFor = blockFor
		this.dataPresent = dataPresent
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.READ_TIMEOUT, protocolVersion)
		}

		encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void {
			const readTimeout = error as ReadTimeout
			encoder.writeString(readTimeout.message, dest)
			encoder.writeUnsignedShort(readTimeout.consistencyLevel, dest)
			encoder.writeInt(readTimeout.received, dest)
			encoder.writeInt(readTimeout.blockFor, dest)
			encoder.writeByte(readTimeout.dataPresent ? 1 : 0, dest)
		}

		encodedSize(error: ProtocolError): number {
			const readTimeout = error as ReadTimeout
			return (
				PrimitiveSizes.sizeOfString(readTimeout.message) +
				PrimitiveSizes.SHORT +
				PrimitiveSizes.INT +
				PrimitiveSizes.INT +
				PrimitiveSizes.BYTE
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const consistencyLevel = decoder.readUnsignedShort(source)
			const received = decoder.readInt(source)
			const blockFor = decoder.readInt(source)
			const dataPresent = decoder.readByte(source) !== 0
			return new ReadTimeout(
				message,
				consistencyLevel,
				received,
				blockFor,
				dataPresent
			)
		}
	}
}
