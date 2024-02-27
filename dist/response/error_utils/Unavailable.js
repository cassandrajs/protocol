import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError";
export class Unavailable extends ProtocolError {
    consistencyLevel;
    required;
    alive;
    constructor(message, consistencyLevel, required, alive) {
        super(ProtocolConstants.ErrorCode.UNAVAILABLE, message);
        this.consistencyLevel = consistencyLevel;
        this.required = required;
        this.alive = alive;
    }
    static SubCodec = class extends ProtocolErrorSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ErrorCode.UNAVAILABLE, protocolVersion);
        }
        encode(dest, error, encoder) {
            const unavailable = error;
            encoder.writeString(unavailable.message, dest);
            encoder.writeUnsignedShort(unavailable.consistencyLevel, dest);
            encoder.writeInt(unavailable.required, dest);
            encoder.writeInt(unavailable.alive, dest);
        }
        encodedSize(error) {
            const unavailable = error;
            return (PrimitiveSizes.sizeOfString(unavailable.message) +
                PrimitiveSizes.SHORT +
                PrimitiveSizes.INT +
                PrimitiveSizes.INT);
        }
        decode(source, decoder) {
            const message = decoder.readString(source);
            const consistencyLevel = decoder.readUnsignedShort(source);
            const required = decoder.readInt(source);
            const alive = decoder.readInt(source);
            return new Unavailable(message, consistencyLevel, required, alive);
        }
    };
}
