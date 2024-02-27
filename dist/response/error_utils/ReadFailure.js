import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError";
export class ReadFailure extends ProtocolError {
    consistencyLevel;
    received;
    blockFor;
    numFailures;
    reasonMap;
    dataPresent;
    constructor(message, consistencyLevel, received, blockFor, numFailures, reasonMap, dataPresent) {
        super(ProtocolConstants.ErrorCode.READ_FAILURE, message);
        this.consistencyLevel = consistencyLevel;
        this.received = received;
        this.blockFor = blockFor;
        this.numFailures = numFailures;
        this.reasonMap = reasonMap;
        this.dataPresent = dataPresent;
    }
    static SubCodec = class extends ProtocolErrorSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ErrorCode.READ_FAILURE, protocolVersion);
        }
        encode(dest, error, encoder) {
            const readFailure = error;
            encoder.writeString(readFailure.message, dest);
            encoder.writeUnsignedShort(readFailure.consistencyLevel, dest);
            encoder.writeInt(readFailure.received, dest);
            encoder.writeInt(readFailure.blockFor, dest);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                ReadFailure.SubCodec.writeReasonMap(readFailure.reasonMap, dest, encoder);
            }
            else {
                encoder.writeInt(readFailure.numFailures, dest);
            }
            encoder.writeByte(readFailure.dataPresent ? 1 : 0, dest);
        }
        encodedSize(error) {
            const readFailure = error;
            let size = PrimitiveSizes.sizeOfString(readFailure.message) +
                PrimitiveSizes.SHORT + // consistencyLevel
                PrimitiveSizes.INT + // received
                PrimitiveSizes.INT + // blockFor
                PrimitiveSizes.BYTE; // dataPresent
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                size += ReadFailure.SubCodec.sizeOfReasonMap(readFailure.reasonMap);
            }
            else {
                size += PrimitiveSizes.INT; // numFailures
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
            const dataPresent = decoder.readByte(source) !== 0;
            return new ReadFailure(message, consistencyLevel, received, blockFor, numFailures, reasonMap, dataPresent);
        }
        static writeReasonMap(m, dest, encoder) {
            encoder.writeInt(m.size, dest);
            for (const entry of m.entries()) {
                encoder.writeInetAddr(entry[0], dest);
                encoder.writeUnsignedShort(entry[1], dest);
            }
        }
        static sizeOfReasonMap(m) {
            let size = PrimitiveSizes.INT;
            for (const entry of m.entries()) {
                size += PrimitiveSizes.sizeOfInetAddr(entry[0]);
                size += PrimitiveSizes.SHORT;
            }
            return size;
        }
        static readReasonMap(source, decoder) {
            const size = decoder.readInt(source);
            if (size === 0) {
                return new Map();
            }
            else {
                const builder = new Map();
                for (let i = 0; i < size; i++) {
                    const key = decoder.readInetAddr(source);
                    const value = decoder.readUnsignedShort(source);
                    builder.set(key, value);
                }
                return builder;
            }
        }
    };
}
