import { ProtocolMessage } from "./ProtocolMessage";
import { UUID } from "./util/UUID";
type Payload = {
    [key: string]: Uint8Array;
};
export declare class Frame {
    static NO_PAYLOAD: Payload;
    static forRequest(protocolVersion: number, streamId: number, tracing: boolean, customPayload: Payload, message: ProtocolMessage): Frame;
    static forResponse(protocolVersion: number, streamId: number, tracingId: UUID, customPayload: Payload, message: ProtocolMessage): Frame;
    protocolVersion: number;
    beta: boolean;
    streamId: number;
    tracingId: UUID;
    tracing: boolean;
    size: number;
    compressedSize: number;
    customPayload: Payload;
    warnings: string[];
    message: ProtocolMessage;
    constructor(protocolVersion: number, beta: boolean, streamId: number, tracing: boolean, tracingId: UUID, size: number, compressedSize: number, customPayload: Payload, warnings: string[], message: ProtocolMessage);
}
export {};
