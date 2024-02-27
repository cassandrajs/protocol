import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { InetAddress } from "../../util/InetAddress"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError"
import { ReadFailure } from "./ReadFailure"

export class WriteFailure extends ProtocolError {
	consistencyLevel: number
	received: number
	blockFor: number
	numFailures: number
	reasonMap: Map<InetAddress, number>
	writeType: string

	constructor(
		message: string,
		consistencyLevel: number,
		received: number,
		blockFor: number,
		numFailures: number,
		reasonMap: Map<InetAddress, number>,
		writeType: string
	) {
		super(ProtocolConstants.ErrorCode.WRITE_FAILURE, message)
		this.consistencyLevel = consistencyLevel
		this.received = received
		this.blockFor = blockFor
		this.numFailures = numFailures
		this.reasonMap = reasonMap
		this.writeType = writeType
	}

	static SubCodec = class extends ProtocolErrorSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ErrorCode.WRITE_FAILURE, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolError,
			encoder: PrimitiveCodec<B>
		): void {
			const writeFailure = message as WriteFailure
			encoder.writeString(writeFailure.message, dest)
			encoder.writeUnsignedShort(writeFailure.consistencyLevel, dest)
			encoder.writeInt(writeFailure.received, dest)
			encoder.writeInt(writeFailure.blockFor, dest)
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				ReadFailure.SubCodec.writeReasonMap(
					writeFailure.reasonMap,
					dest,
					encoder
				)
			} else {
				encoder.writeInt(writeFailure.numFailures, dest)
			}
			encoder.writeString(writeFailure.writeType, dest)
		}

		encodedSize(message: ProtocolError): number {
			const writeFailure = message as WriteFailure
			let size =
				PrimitiveSizes.sizeOfString(writeFailure.message) +
				PrimitiveSizes.SHORT + // consistencyLevel
				PrimitiveSizes.INT + // received
				PrimitiveSizes.INT + // blockFor
				PrimitiveSizes.sizeOfString(writeFailure.writeType)
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				size += ReadFailure.SubCodec.sizeOfReasonMap(writeFailure.reasonMap)
			} else {
				size += PrimitiveSizes.INT
			}
			return size
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolError {
			const message = decoder.readString(source)
			const consistencyLevel = decoder.readUnsignedShort(source)
			const received = decoder.readInt(source)
			const blockFor = decoder.readInt(source)
			let numFailures: number
			let reasonMap: Map<InetAddress, number>
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				reasonMap = ReadFailure.SubCodec.readReasonMap(source, decoder)
				numFailures = reasonMap.size
			} else {
				reasonMap = new Map()
				numFailures = decoder.readInt(source)
			}
			const writeType = decoder.readString(source)
			return new WriteFailure(
				message,
				consistencyLevel,
				received,
				blockFor,
				numFailures,
				reasonMap,
				writeType
			)
		}
	}
}
