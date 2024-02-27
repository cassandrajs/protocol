import { PrimitiveCodec } from "../PrimitiveCodec";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolVersion } from "../util/ProtocolConstants";
export declare class Startup extends ProtocolMessage {
    static CQL_VERSION_KEY: string;
    static COMPRESSION_KEY: string;
    static CQL_VERSION: string;
    options: {
        [key: string]: string;
    };
    constructor(options?: string | {
        [key: string]: string;
    });
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
