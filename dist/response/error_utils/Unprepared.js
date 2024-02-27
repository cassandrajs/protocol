import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError";
export class Unprepared extends ProtocolError {
    id;
    constructor(message, id) {
        super(ProtocolConstants.ErrorCode.UNPREPARED, message);
        this.id = id;
    }
    static SubCodec = class extends ProtocolErrorSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ErrorCode.UNPREPARED, protocolVersion);
        }
        encode(dest, error, encoder) {
            const unprepared = error;
            encoder.writeString(unprepared.message, dest);
            encoder.writeShortBytes(unprepared.id, dest);
        }
        encodedSize(error) {
            const unprepared = error;
            return (PrimitiveSizes.sizeOfString(unprepared.message) +
                PrimitiveSizes.sizeOfShortBytes(unprepared.id));
        }
        decode(source, decoder) {
            const message = decoder.readString(source);
            const id = decoder.readShortBytes(source);
            return new Unprepared(message, id);
        }
    };
}
