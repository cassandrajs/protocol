import { PrimitiveCodec } from "../PrimitiveCodec";
import { ProtocolMessage } from "../ProtocolMessage";
import { Opcode, ProtocolVersion } from "../util/ProtocolConstants";
export declare class Register extends ProtocolMessage {
    eventTypes: string[];
    constructor(eventTypes: string[]);
    toString(): string;
    static Codec: {
        new (protocolVersion: ProtocolVersion): {
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            opcode: Opcode;
            protocolVersion: ProtocolVersion;
        };
    };
}
