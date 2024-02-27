import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class AuthChallenge extends ProtocolMessage {
    token;
    constructor(token) {
        super(true, ProtocolConstants.Opcode.AUTH_CHALLENGE);
        this.token = token;
    }
    toString() {
        return "AUTH_CHALLENGE";
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.AUTH_CHALLENGE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const authChallenge = message;
            encoder.writeBytes(authChallenge.token, dest);
        }
        encodedSize(message) {
            const authChallenge = message;
            return PrimitiveSizes.sizeOfBytes(authChallenge.token);
        }
        decode(source, decoder) {
            return new AuthChallenge(decoder.readBytes(source));
        }
    };
}
