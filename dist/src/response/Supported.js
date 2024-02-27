import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class Supported extends ProtocolMessage {
    options;
    constructor(options) {
        super(true, ProtocolConstants.Opcode.SUPPORTED);
        this.options = options;
    }
    toString() {
        return "SUPPORTED " + JSON.stringify(this.options);
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.SUPPORTED, protocolVersion);
        }
        encode(dest, message, encoder) {
            const supported = message;
            encoder.writeStringMultimap(supported.options, dest);
        }
        encodedSize(message) {
            const supported = message;
            return PrimitiveSizes.sizeOfStringMultimap(supported.options);
        }
        decode(source, decoder) {
            const options = decoder.readStringMultimap(source);
            return new Supported(options);
        }
    };
}
