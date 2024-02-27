import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolMessage } from "../../ProtocolMessage";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { Rows } from "./Rows";
import { RowsMetadata } from "./RowsMetadata";
export declare class DefaultRows extends Rows {
    metadata: RowsMetadata;
    data: Uint8Array[][];
    constructor(metadata: RowsMetadata, data: Uint8Array[][]);
    getMetadata(): RowsMetadata;
    getData(): Uint8Array[][];
    toString(): string;
    static SubCodec: {
        new (protocolVersion: ProtocolVersion): {
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            kind: number;
            protocolVersion: ProtocolVersion;
        };
    };
}
