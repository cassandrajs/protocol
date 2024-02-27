import { PrimitiveCodec } from "../PrimitiveCodec";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolVersion } from "../util/ProtocolConstants";
export declare class ProtocolEventSubCodec {
    type: string;
    protocolVersion: ProtocolVersion;
    constructor(type: string, protocolVersion: ProtocolVersion);
    encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
    encodedSize(message: ProtocolMessage): number;
    decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage;
}
export declare abstract class ProtocolEvent extends ProtocolMessage {
    type: string;
    protected constructor(type: string);
    static Codec: {
        new (protocolVersion: ProtocolVersion, ...subCodecs: ProtocolEventSubCodec[]): {
            subDecoders: Map<string, ProtocolEventSubCodec>;
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            getSubCodec(type: string): ProtocolEventSubCodec;
            opcode: import("../util/ProtocolConstants").Opcode;
            protocolVersion: ProtocolVersion;
        };
    };
    static SubCodec: typeof ProtocolEventSubCodec;
}
