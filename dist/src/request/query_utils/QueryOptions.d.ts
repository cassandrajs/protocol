import Long from "long";
import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolVersion } from "../../util/ProtocolConstants";
export declare class QueryOptionsCodec {
    protocolVersion: ProtocolVersion;
    constructor(protocolVersion: ProtocolVersion);
    encode<B>(dest: B, options: QueryOptions, encoder: PrimitiveCodec<B>): void;
    encodedSize(options: QueryOptions): number;
    decode<B>(source: B, decoder: PrimitiveCodec<B>): QueryOptions;
    queryFlagsSize(protocolVersion: ProtocolVersion): number;
}
export declare class QueryOptions {
    static NO_DEFAULT_TIMESTAMP: Long;
    static NO_NOW_IN_SECONDS: number;
    static DEFAULT: QueryOptions;
    flags: number;
    consistency: number;
    positionalValues: Uint8Array[];
    namedValues: {
        [key: string]: Uint8Array;
    };
    skipMetadata: boolean;
    pageSize: number;
    pagingState: Uint8Array;
    serialConsistency: number;
    defaultTimestamp: Long;
    keyspace: string;
    nowInSeconds: number;
    constructor(flags: number, consistency: number, positionalValues: Uint8Array[], namedValues: {
        [key: string]: Uint8Array;
    }, skipMetadata: boolean, pageSize: number, pagingState: Uint8Array, serialConsistency: number, defaultTimestamp: Long, keyspace: string, nowInSeconds: number);
    toString(): string;
    static computeFlags(positionalValues: Uint8Array[], namedValues: {
        [key: string]: Uint8Array;
    }, skipMetadata: boolean, pageSize: number, pagingState: any | null, serialConsistency: number, defaultTimestamp: Long, keyspace: string | null, nowInSeconds: number): number;
    static Codec: typeof QueryOptionsCodec;
}
