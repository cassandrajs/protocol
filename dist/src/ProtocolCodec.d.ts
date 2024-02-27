import { PrimitiveCodec } from "./PrimitiveCodec";
import { ProtocolMessage } from "./ProtocolMessage";
import { Opcode } from "./util/ProtocolConstants";
export declare class ProtocolCodec {
    opcode: Opcode;
    protocolVersion: number;
    constructor(opcode: Opcode, protocolVersion: number);
    encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
    encodedSize(message: ProtocolMessage): number;
    decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage;
}
