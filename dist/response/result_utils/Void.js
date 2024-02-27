import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { Result, ResultSubCodec } from "../Result";
export class VoidResult extends Result {
    static INSTANCE = new VoidResult();
    constructor() {
        super(ProtocolConstants.ResultKind.VOID);
    }
    toString() {
        return "VOID";
    }
    static SubCodec = class extends ResultSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ResultKind.VOID, protocolVersion);
        }
        encode(dest, message, encoder) { }
        encodedSize(message) {
            return 0;
        }
        decode(source, decoder) {
            return VoidResult.INSTANCE;
        }
    };
}
