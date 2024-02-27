import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolMessage } from "../../ProtocolMessage";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { Result } from "../Result";
export declare class SchemaChange extends Result {
    changeType: string;
    target: string;
    keyspace: string;
    object: string | null;
    arguments: string[] | null;
    constructor(changeType: string, target: string, keyspace: string, object: string | null, args: string[] | null);
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
