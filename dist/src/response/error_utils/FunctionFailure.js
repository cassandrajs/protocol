import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolError, ProtocolErrorSubCodec } from "../ProtocolError";
export class FunctionFailure extends ProtocolError {
    keyspace;
    function;
    argTypes;
    constructor(message, keyspace, func, argTypes) {
        super(ProtocolConstants.ErrorCode.FUNCTION_FAILURE, message);
        this.keyspace = keyspace;
        this.function = func;
        this.argTypes = argTypes;
    }
    static SubCodec = class extends ProtocolErrorSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ErrorCode.FUNCTION_FAILURE, protocolVersion);
        }
        encode(dest, error, encoder) {
            const functionFailure = error;
            encoder.writeString(functionFailure.message, dest);
            encoder.writeString(functionFailure.keyspace, dest);
            encoder.writeString(functionFailure.function, dest);
            encoder.writeStringList(functionFailure.argTypes, dest);
        }
        encodedSize(error) {
            const functionFailure = error;
            return (PrimitiveSizes.sizeOfString(functionFailure.message) +
                PrimitiveSizes.sizeOfString(functionFailure.keyspace) +
                PrimitiveSizes.sizeOfString(functionFailure.function) +
                PrimitiveSizes.sizeOfStringList(functionFailure.argTypes));
        }
        decode(source, decoder) {
            const message = decoder.readString(source);
            const keyspace = decoder.readString(source);
            const func = decoder.readString(source);
            const argTypes = decoder.readStringList(source);
            return new FunctionFailure(message, keyspace, func, argTypes);
        }
    };
}
