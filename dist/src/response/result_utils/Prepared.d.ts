import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolMessage } from "../../ProtocolMessage";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { Result } from "../Result";
import { RowsMetadata } from "./RowsMetadata";
export declare class Prepared extends Result {
    preparedQueryId: number[];
    resultMetadataId: number[];
    variablesMetadata: RowsMetadata;
    resultMetadata: RowsMetadata;
    constructor(preparedQueryId: number[], resultMetadataId: number[], variablesMetadata: RowsMetadata, resultMetadata: RowsMetadata);
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
