import { IllegalArgumentError } from "./errors/IllegalArgumentError";
export class Frame {
    static NO_PAYLOAD = {};
    static forRequest(protocolVersion, streamId, tracing, customPayload, message) {
        return new Frame(protocolVersion, false, streamId, tracing, null, -1, -1, customPayload, [], message);
    }
    static forResponse(protocolVersion, streamId, tracingId, customPayload, message) {
        return new Frame(protocolVersion, false, streamId, false, tracingId, -1, -1, customPayload, [], message);
    }
    protocolVersion;
    beta;
    streamId;
    tracingId;
    tracing;
    size;
    compressedSize;
    customPayload;
    warnings;
    message;
    constructor(protocolVersion, beta, streamId, tracing, tracingId, size, compressedSize, customPayload, warnings, message) {
        if (!(Object.keys(customPayload).length == 0 || protocolVersion >= 4)) {
            throw new IllegalArgumentError("Custom payloads require protocol V4");
        }
        this.protocolVersion = protocolVersion;
        this.beta = beta;
        this.streamId = streamId;
        this.tracingId = tracingId;
        this.tracing = tracing;
        this.size = size;
        this.compressedSize = compressedSize;
        this.customPayload = customPayload;
        this.warnings = warnings;
        this.message = message;
    }
}
