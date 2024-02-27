import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError";
export class CASWriteUnknown extends ProtocolError {
    consistencyLevel;
    received;
    blockFor;
    constructor(message, consistencyLevel, received, blockFor) {
        super(ProtocolConstants.ErrorCode.CAS_WRITE_UNKNOWN, message);
        this.consistencyLevel = consistencyLevel;
        this.received = received;
        this.blockFor = blockFor;
    }
    static SubCodec = class extends ProtocolErrorSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ErrorCode.CAS_WRITE_UNKNOWN, protocolVersion);
        }
        encode(dest, error, encoder) {
            const casWriteUnknown = error;
            encoder.writeString(casWriteUnknown.message, dest);
            encoder.writeUnsignedShort(casWriteUnknown.consistencyLevel, dest);
            encoder.writeInt(casWriteUnknown.received, dest);
            encoder.writeInt(casWriteUnknown.blockFor, dest);
        }
        encodedSize(error) {
            const casWriteUnknown = error;
            return (PrimitiveSizes.sizeOfString(casWriteUnknown.message) +
                PrimitiveSizes.SHORT +
                PrimitiveSizes.INT +
                PrimitiveSizes.INT);
        }
        decode(source, decoder) {
            const message = decoder.readString(source);
            const consistencyLevel = decoder.readUnsignedShort(source);
            const received = decoder.readInt(source);
            const blockFor = decoder.readInt(source);
            return new CASWriteUnknown(message, consistencyLevel, received, blockFor);
        }
    };
}
