import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class AuthSuccess extends ProtocolMessage {
    token;
    constructor(token) {
        super(true, ProtocolConstants.Opcode.AUTH_SUCCESS);
        this.token = token;
    }
    toString() {
        return "AUTH_SUCCESS";
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.AUTH_CHALLENGE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const authSuccess = message;
            encoder.writeBytes(authSuccess.token, dest);
        }
        encodedSize(message) {
            const authSuccess = message;
            return PrimitiveSizes.sizeOfBytes(authSuccess.token);
        }
        decode(source, decoder) {
            return new AuthSuccess(decoder.readBytes(source));
        }
    };
}
