import { PrimitiveCodec } from "../PrimitiveCodec";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolVersion } from "../util/ProtocolConstants";
import { QueryOptions, QueryOptionsCodec } from "./query_utils/QueryOptions";
export declare class Query extends ProtocolMessage {
    query: string;
    options: QueryOptions;
    constructor(query: string, options?: QueryOptions);
    toString(): string;
    static Codec: {
        new (protocolVersion: ProtocolVersion, optionsCodec?: QueryOptionsCodec): {
            optionsCodec: QueryOptionsCodec;
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            opcode: import("../util/ProtocolConstants").Opcode;
            protocolVersion: ProtocolVersion;
        };
    };
}
