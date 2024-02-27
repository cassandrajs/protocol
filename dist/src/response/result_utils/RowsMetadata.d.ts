import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ColumnSpec } from "./ColumnSpec";
export declare class RowsMetadata {
    columnSpecs: ColumnSpec[];
    columnCount: number;
    pagingState: Uint8Array;
    pkIndices: number[];
    newResultMetadataId: number[];
    flags: number;
    constructor(flags: number, columnSpecs: ColumnSpec[], columnCount: number, pagingState: Uint8Array, pkIndices: number[], newResultMetadataId: number[]);
    static fromColumnSpecs(columnSpecs: ColumnSpec[], pagingState: Uint8Array, pkIndices: number[], newResultMetadataId: number[]): RowsMetadata;
    static noMetadata(columnCount: number, pagingState: Uint8Array, pkIndices: number[], newResultMetadataId: number[]): RowsMetadata;
    static computeFlags(noMetadata: boolean, columnSpecs: ColumnSpec[], pagingState: Uint8Array, newResultMetadataId: number[]): number;
    encode<B>(dest: B, encoder: PrimitiveCodec<B>, withPkIndices: boolean, protocolVersion: ProtocolVersion): void;
    encodedSize(withPkIndices: boolean, protocolVersion: ProtocolVersion): number;
    static decode<B>(source: B, decoder: PrimitiveCodec<B>, withPkIndices: boolean, protocolVersion: ProtocolVersion): RowsMetadata;
    static haveSameTable(specs: ColumnSpec[]): boolean;
}
