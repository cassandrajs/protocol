import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { Result, ResultSubCodec } from "../Result";
export class SetKeyspace extends Result {
    keyspace;
    constructor(keyspace) {
        super(ProtocolConstants.ResultKind.SET_KEYSPACE);
        this.keyspace = keyspace;
    }
    toString() {
        return `SET_KEYSPACE(${this.keyspace})`;
    }
    static SubCodec = class extends ResultSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ResultKind.SET_KEYSPACE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const setKeyspace = message;
            encoder.writeString(setKeyspace.keyspace, dest);
        }
        encodedSize(message) {
            const setKeyspace = message;
            return PrimitiveSizes.sizeOfString(setKeyspace.keyspace);
        }
        decode(source, decoder) {
            const keyspace = decoder.readString(source);
            return new SetKeyspace(keyspace);
        }
    };
}
