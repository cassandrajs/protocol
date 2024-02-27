import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { ProtocolMessage } from "../../ProtocolMessage"
import { Bytes } from "../../util/Bytes"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { Result, ResultSubCodec } from "../Result"
import { RowsMetadata } from "./RowsMetadata"

export class Prepared extends Result {
	preparedQueryId: number[]
	resultMetadataId: number[]
	variablesMetadata: RowsMetadata
	resultMetadata: RowsMetadata

	constructor(
		preparedQueryId: number[],
		resultMetadataId: number[],
		variablesMetadata: RowsMetadata,
		resultMetadata: RowsMetadata
	) {
		super(ProtocolConstants.ResultKind.PREPARED)
		this.preparedQueryId = preparedQueryId
		this.resultMetadataId = resultMetadataId
		this.variablesMetadata = variablesMetadata
		this.resultMetadata = resultMetadata
	}

	toString(): string {
		return `PREPARED(${Bytes.toHexString(this.preparedQueryId)})`
	}

	static SubCodec = class extends ResultSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ResultKind.PREPARED, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const prepared = message as Prepared
			encoder.writeShortBytes(prepared.preparedQueryId, dest)
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				if (prepared.resultMetadataId) {
					encoder.writeShortBytes(prepared.resultMetadataId, dest)
				}
			}
			const hasPkIndices = this.protocolVersion >= ProtocolConstants.Version.V4
			prepared.variablesMetadata.encode(
				dest,
				encoder,
				hasPkIndices,
				this.protocolVersion
			)
			prepared.resultMetadata.encode(dest, encoder, false, this.protocolVersion)
		}

		encodedSize(message: ProtocolMessage): number {
			const prepared = message as Prepared
			let size = PrimitiveSizes.sizeOfShortBytes(prepared.preparedQueryId)
			if (
				this.protocolVersion >= ProtocolConstants.Version.V5 &&
				prepared.resultMetadataId
			) {
				size += PrimitiveSizes.sizeOfShortBytes(prepared.resultMetadataId)
			}
			const hasPkIndices = this.protocolVersion >= ProtocolConstants.Version.V4
			size += prepared.variablesMetadata.encodedSize(
				hasPkIndices,
				this.protocolVersion
			)
			size += prepared.resultMetadata.encodedSize(false, this.protocolVersion)
			return size
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const preparedQueryId = decoder.readShortBytes(source)
			let resultMetadataId: number[] | null = null
			if (this.protocolVersion >= ProtocolConstants.Version.V5) {
				resultMetadataId = decoder.readShortBytes(source)
			}
			const hasPkIndices = this.protocolVersion >= ProtocolConstants.Version.V4
			const variablesMetadata = RowsMetadata.decode(
				source,
				decoder,
				hasPkIndices,
				this.protocolVersion
			)
			const resultMetadata = RowsMetadata.decode(
				source,
				decoder,
				false,
				this.protocolVersion
			)
			return new Prepared(
				preparedQueryId,
				resultMetadataId,
				variablesMetadata,
				resultMetadata
			)
		}
	}
}
