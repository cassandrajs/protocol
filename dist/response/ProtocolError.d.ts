import { PrimitiveCodec } from "../PrimitiveCodec";
import { ProtocolMessage } from "../ProtocolMessage";
import { IntMap } from "../util/IntMap";
import { ProtocolVersion } from "../util/ProtocolConstants";
export declare class ProtocolErrorSubCodec {
    errorCode: number;
    protocolVersion: ProtocolVersion;
    constructor(errorCode: number, protocolVersion: ProtocolVersion);
    encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
    encodedSize(message: ProtocolMessage): number;
    decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage;
}
declare class SingleMessageSubCodec extends ProtocolErrorSubCodec {
    constructor(errorCode: number, protocolVersion: ProtocolVersion);
    encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
    encodedSize(message: ProtocolMessage): number;
    decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage;
}
export declare class ProtocolError extends ProtocolMessage {
    code: number;
    message: string;
    constructor(code: number, message: string);
    toString(): string;
    static Codec: {
        new (protocolVersion: ProtocolVersion, ...subCodecs: ProtocolErrorSubCodec[]): {
            subCodecs: IntMap<ProtocolErrorSubCodec>;
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            getSubCodec(errorCode: number): ProtocolErrorSubCodec;
            opcode: import("../util/ProtocolConstants").Opcode;
            protocolVersion: ProtocolVersion;
        };
    };
    static SubCodec: typeof ProtocolErrorSubCodec;
    static SingleMessageSubCodec: typeof SingleMessageSubCodec;
}
export {};
