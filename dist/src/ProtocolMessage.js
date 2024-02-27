export class ProtocolMessage {
    isResponse;
    opcode;
    constructor(isResponse, opcode) {
        this.isResponse = isResponse;
        this.opcode = opcode;
    }
}
