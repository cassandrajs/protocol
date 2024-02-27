export class ProtocolCodec {
    opcode;
    protocolVersion;
    constructor(opcode, protocolVersion) {
        this.opcode = opcode;
        this.protocolVersion = protocolVersion;
    }
    encode(dest, message, encoder) {
        throw new Error("Not implemented");
    }
    encodedSize(message) {
        throw new Error("Not implemented");
    }
    decode(source, decoder) {
        throw new Error("Not implemented");
    }
}
