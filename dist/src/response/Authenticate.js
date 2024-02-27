import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class Authenticate extends ProtocolMessage {
    authenticator;
    constructor(authenticator) {
        super(true, ProtocolConstants.Opcode.AUTHENTICATE);
        this.authenticator = authenticator;
    }
    toString() {
        return "AUTHENTICATE";
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.AUTHENTICATE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const authenticate = message;
            encoder.writeString(authenticate.authenticator, dest);
        }
        encodedSize(message) {
            const authenticate = message;
            return PrimitiveSizes.sizeOfString(authenticate.authenticator);
        }
        decode(source, decoder) {
            return new Authenticate(decoder.readString(source));
        }
    };
}
