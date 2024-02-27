import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants, } from "../util/ProtocolConstants";
export class Register extends ProtocolMessage {
    eventTypes;
    constructor(eventTypes) {
        super(false, ProtocolConstants.Opcode.REGISTER);
        this.eventTypes = eventTypes;
    }
    toString() {
        return "REGISTER " + this.eventTypes;
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.REGISTER, protocolVersion);
        }
        encode(dest, message, encoder) {
            let register = message;
            encoder.writeStringList(register.eventTypes, dest);
        }
        encodedSize(message) {
            let register = message;
            return PrimitiveSizes.sizeOfStringList(register.eventTypes);
        }
        decode(source, decoder) {
            return new Register(decoder.readStringList(source));
        }
    };
}
