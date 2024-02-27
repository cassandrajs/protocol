import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ResultSubCodec } from "../Result";
import { Rows } from "./Rows";
import { RowsMetadata } from "./RowsMetadata";
export class DefaultRows extends Rows {
    metadata;
    data;
    constructor(metadata, data) {
        super();
        this.metadata = metadata;
        this.data = data;
    }
    getMetadata() {
        return this.metadata;
    }
    getData() {
        return this.data;
    }
    toString() {
        return `ROWS(${this.data.length} x ${this.metadata.columnCount} columns)`;
    }
    static SubCodec = class extends ResultSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ResultKind.ROWS, protocolVersion);
        }
        encode(dest, message, encoder) {
            const rows = message;
            rows.metadata.encode(dest, encoder, false, this.protocolVersion);
            encoder.writeInt(rows.data.length, dest);
            for (const row of rows.data) {
                for (const column of row) {
                    encoder.writeBytes(column, dest);
                }
            }
        }
        encodedSize(message) {
            const rows = message;
            let size = rows.metadata.encodedSize(false, this.protocolVersion) +
                PrimitiveSizes.INT;
            for (const row of rows.data) {
                for (const column of row) {
                    size += PrimitiveSizes.sizeOfBytes(column);
                }
            }
            return size;
        }
        decode(source, decoder) {
            const metadata = RowsMetadata.decode(source, decoder, false, this.protocolVersion);
            const rowCount = decoder.readInt(source);
            const data = [];
            for (let i = 0; i < rowCount; i++) {
                const row = [];
                for (let j = 0; j < metadata.columnCount; j++) {
                    row.push(decoder.readBytes(source));
                }
                data.push(row);
            }
            return new DefaultRows(metadata, data);
        }
    };
}
