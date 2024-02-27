import { PrimitiveCodec } from "../PrimitiveCodec";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolVersion } from "../util/ProtocolConstants";
export declare class AuthSuccess extends ProtocolMessage {
    token: Uint8Array;
    constructor(token: Uint8Array);
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
