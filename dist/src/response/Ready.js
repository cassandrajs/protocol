import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class Ready extends ProtocolMessage {
    constructor() {
        super(true, ProtocolConstants.Opcode.READY);
    }
    toString() {
        return "READY";
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.READY, protocolVersion);
        }
        encode(dest, message, encoder) { }
        encodedSize(message) {
            return 0;
        }
        decode(source, decoder) {
            return new Ready();
        }
    };
}
