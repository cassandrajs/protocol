import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { ProtocolMessage } from "../../ProtocolMessage"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ResultSubCodec } from "../Result"
import { Rows } from "./Rows"
import { RowsMetadata } from "./RowsMetadata"

export class DefaultRows extends Rows {
	metadata: RowsMetadata
	data: Uint8Array[][]

	constructor(metadata: RowsMetadata, data: Uint8Array[][]) {
		super()
		this.metadata = metadata
		this.data = data
	}

	getMetadata(): RowsMetadata {
		return this.metadata
	}

	getData(): Uint8Array[][] {
		return this.data
	}

	toString(): string {
		return `ROWS(${this.data.length} x ${this.metadata.columnCount} columns)`
	}

	static SubCodec = class extends ResultSubCodec {
		constructor(protocolVersion: ProtocolVersion) {
			super(ProtocolConstants.ResultKind.ROWS, protocolVersion)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const rows = message as DefaultRows
			rows.metadata.encode(dest, encoder, false, this.protocolVersion)
			encoder.writeInt(rows.data.length, dest)
			for (const row of rows.data) {
				for (const column of row) {
					encoder.writeBytes(column, dest)
				}
			}
		}

		encodedSize(message: ProtocolMessage): number {
			const rows = message as DefaultRows
			let size =
				rows.metadata.encodedSize(false, this.protocolVersion) +
				PrimitiveSizes.INT
			for (const row of rows.data) {
				for (const column of row) {
					size += PrimitiveSizes.sizeOfBytes(column)
				}
			}
			return size
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const metadata = RowsMetadata.decode(
				source,
				decoder,
				false,
				this.protocolVersion
			)
			const rowCount = decoder.readInt(source)

			const data: Uint8Array[][] = []
			for (let i = 0; i < rowCount; i++) {
				const row = []
				for (let j = 0; j < metadata.columnCount; j++) {
					row.push(decoder.readBytes(source))
				}
				data.push(row)
			}

			return new DefaultRows(metadata, data)
		}
	}
}
