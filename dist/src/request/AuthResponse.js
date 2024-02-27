import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class AuthResponse extends ProtocolMessage {
    token;
    constructor(token) {
        super(false, ProtocolConstants.Opcode.AUTH_RESPONSE);
        this.token = token;
    }
    toString() {
        return "AUTH_RESPONSE";
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.AUTH_RESPONSE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const authResponse = message;
            encoder.writeBytes(authResponse.token, dest);
        }
        encodedSize(message) {
            const authResponse = message;
            return PrimitiveSizes.sizeOfBytes(authResponse.token);
        }
        decode(source, decoder) {
            return new AuthResponse(decoder.readBytes(source));
        }
    };
}
