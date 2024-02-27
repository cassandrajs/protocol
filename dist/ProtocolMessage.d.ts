import { Opcode } from "./util/ProtocolConstants";
export declare class ProtocolMessage {
    isResponse: boolean;
    opcode: Opcode;
    constructor(isResponse: boolean, opcode: Opcode);
}
