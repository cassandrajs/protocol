import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class Options extends ProtocolMessage {
    static INSTANCE = new Options();
    constructor() {
        super(false, ProtocolConstants.Opcode.OPTIONS);
    }
    toString() {
        return "OPTIONS";
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.OPTIONS, protocolVersion);
        }
        encode(dest, message, encoder) {
            // nothing to do
        }
        encodedSize(message) {
            return 0;
        }
        decode(source, decoder) {
            return Options.INSTANCE;
        }
    };
}
