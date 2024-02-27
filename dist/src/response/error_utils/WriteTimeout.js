import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError";
export class WriteTimeout extends ProtocolError {
    consistencyLevel;
    received;
    blockFor;
    writeType;
    constructor(message, consistencyLevel, received, blockFor, writeType) {
        super(ProtocolConstants.ErrorCode.WRITE_TIMEOUT, message);
        this.consistencyLevel = consistencyLevel;
        this.received = received;
        this.blockFor = blockFor;
        this.writeType = writeType;
    }
    static SubCodec = class extends ProtocolErrorSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ErrorCode.WRITE_TIMEOUT, protocolVersion);
        }
        encode(dest, error, encoder) {
            const writeTimeout = error;
            encoder.writeString(writeTimeout.message, dest);
            encoder.writeUnsignedShort(writeTimeout.consistencyLevel, dest);
            encoder.writeInt(writeTimeout.received, dest);
            encoder.writeInt(writeTimeout.blockFor, dest);
            encoder.writeString(writeTimeout.writeType, dest);
        }
        encodedSize(error) {
            const writeTimeout = error;
            return (PrimitiveSizes.sizeOfString(writeTimeout.message) +
                PrimitiveSizes.SHORT +
                PrimitiveSizes.INT +
                PrimitiveSizes.INT +
                PrimitiveSizes.sizeOfString(writeTimeout.writeType));
        }
        decode(source, decoder) {
            const message = decoder.readString(source);
            const consistencyLevel = decoder.readUnsignedShort(source);
            const received = decoder.readInt(source);
            const blockFor = decoder.readInt(source);
            const writeType = decoder.readString(source);
            return new WriteTimeout(message, consistencyLevel, received, blockFor, writeType);
        }
    };
}
