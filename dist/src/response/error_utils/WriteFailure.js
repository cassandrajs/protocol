import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError";
import { ReadFailure } from "./ReadFailure";
export class WriteFailure extends ProtocolError {
    consistencyLevel;
    received;
    blockFor;
    numFailures;
    reasonMap;
    writeType;
    constructor(message, consistencyLevel, received, blockFor, numFailures, reasonMap, writeType) {
        super(ProtocolConstants.ErrorCode.WRITE_FAILURE, message);
        this.consistencyLevel = consistencyLevel;
        this.received = received;
        this.blockFor = blockFor;
        this.numFailures = numFailures;
        this.reasonMap = reasonMap;
        this.writeType = writeType;
    }
    static SubCodec = class extends ProtocolErrorSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ErrorCode.WRITE_FAILURE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const writeFailure = message;
            encoder.writeString(writeFailure.message, dest);
            encoder.writeUnsignedShort(writeFailure.consistencyLevel, dest);
            encoder.writeInt(writeFailure.received, dest);
            encoder.writeInt(writeFailure.blockFor, dest);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                ReadFailure.SubCodec.writeReasonMap(writeFailure.reasonMap, dest, encoder);
            }
            else {
                encoder.writeInt(writeFailure.numFailures, dest);
            }
            encoder.writeString(writeFailure.writeType, dest);
        }
        encodedSize(message) {
            const writeFailure = message;
            let size = PrimitiveSizes.sizeOfString(writeFailure.message) +
                PrimitiveSizes.SHORT + // consistencyLevel
                PrimitiveSizes.INT + // received
                PrimitiveSizes.INT + // blockFor
                PrimitiveSizes.sizeOfString(writeFailure.writeType);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                size += ReadFailure.SubCodec.sizeOfReasonMap(writeFailure.reasonMap);
            }
            else {
                size += PrimitiveSizes.INT;
            }
            return size;
        }
        decode(source, decoder) {
            const message = decoder.readString(source);
            const consistencyLevel = decoder.readUnsignedShort(source);
            const received = decoder.readInt(source);
            const blockFor = decoder.readInt(source);
            let numFailures;
            let reasonMap;
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                reasonMap = ReadFailure.SubCodec.readReasonMap(source, decoder);
                numFailures = reasonMap.size;
            }
            else {
                reasonMap = new Map();
                numFailures = decoder.readInt(source);
            }
            const writeType = decoder.readString(source);
            return new WriteFailure(message, consistencyLevel, received, blockFor, numFailures, reasonMap, writeType);
        }
    };
}
