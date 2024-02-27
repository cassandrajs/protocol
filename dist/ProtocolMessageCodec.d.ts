import { PrimitiveCodec } from "./PrimitiveCodec";
import { ProtocolMessage } from "./ProtocolMessage";
import { Opcode, ProtocolVersion } from "./util/ProtocolConstants";
export declare class ProtocolMessageCodec {
    opcode: Opcode;
    protocolVersion: ProtocolVersion;
    constructor(opcode: Opcode, protocolVersion: ProtocolVersion);
    encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
    encodedSize(message: ProtocolMessage): number;
    decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage;
}
