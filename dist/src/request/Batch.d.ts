import Long from "long";
import { PrimitiveCodec } from "../PrimitiveCodec";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolVersion } from "../util/ProtocolConstants";
export declare class Batch extends ProtocolMessage {
    type: number;
    queriesOrIds: (string | number[])[];
    values: Array<Array<Uint8Array>>;
    consistency: number;
    serialConsistency: number;
    defaultTimestamp: Long;
    keyspace: string;
    nowInSeconds: number;
    flags: number;
    constructor(flags: number, type: number, queriesOrIds: (string | number[])[], values: Array<Array<Uint8Array>>, consistency: number, serialConsistency: number, defaultTimestamp: Long, keyspace: string, nowInSeconds: number);
    computeFlags(serialConsistency: number, defaultTimestamp: Long, keyspace: string, nowInSeconds: number): number;
    toString(): string;
    static Codec: {
        new (protocolVersion: ProtocolVersion): {
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            opcode: import("../util/ProtocolConstants").Opcode;
            protocolVersion: ProtocolVersion;
        };
    };
}
