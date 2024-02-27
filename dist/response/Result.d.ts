import { PrimitiveCodec } from "../PrimitiveCodec";
import { ProtocolMessage } from "../ProtocolMessage";
import { IntMap } from "../util/IntMap";
import { ProtocolVersion } from "../util/ProtocolConstants";
export declare class ResultSubCodec {
    kind: number;
    protocolVersion: ProtocolVersion;
    protected constructor(kind: number, protocolVersion: ProtocolVersion);
    encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
    encodedSize(message: ProtocolMessage): number;
    decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage;
}
export declare abstract class Result extends ProtocolMessage {
    kind: number;
    protected constructor(kind: number);
    static Codec: {
        new (protocolVersion: ProtocolVersion, ...subCodecs: ResultSubCodec[]): {
            subDecoders: IntMap<ResultSubCodec>;
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            getSubCodec(kind: number): ResultSubCodec;
            opcode: import("../util/ProtocolConstants").Opcode;
            protocolVersion: ProtocolVersion;
        };
    };
    static SubCodec: typeof ResultSubCodec;
}
