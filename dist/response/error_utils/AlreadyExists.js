import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError";
export class AlreadyExists extends ProtocolError {
    keyspace;
    table;
    constructor(message, keyspace, table) {
        super(ProtocolConstants.ErrorCode.ALREADY_EXISTS, message);
        this.keyspace = keyspace;
        this.table = table;
    }
    static SubCodec = class extends ProtocolErrorSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ErrorCode.ALREADY_EXISTS, protocolVersion);
        }
        encode(dest, error, encoder) {
            const alreadyExists = error;
            encoder.writeString(alreadyExists.message, dest);
            encoder.writeString(alreadyExists.keyspace, dest);
            encoder.writeString(alreadyExists.table, dest);
        }
        encodedSize(error) {
            const alreadyExists = error;
            return (PrimitiveSizes.sizeOfString(alreadyExists.message) +
                PrimitiveSizes.sizeOfString(alreadyExists.keyspace) +
                PrimitiveSizes.sizeOfString(alreadyExists.table));
        }
        decode(source, decoder) {
            const message = decoder.readString(source);
            const keyspace = decoder.readString(source);
            const table = decoder.readString(source);
            return new AlreadyExists(message, keyspace, table);
        }
    };
}
