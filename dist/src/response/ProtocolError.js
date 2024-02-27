import { IllegalArgumentError } from "../errors/IllegalArgumentError";
import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { IntMap } from "../util/IntMap";
import { ProtocolConstants } from "../util/ProtocolConstants";
import { AlreadyExists } from "./error_utils/AlreadyExists";
import { CASWriteUnknown } from "./error_utils/CASWriteUnknown";
import { FunctionFailure } from "./error_utils/FunctionFailure";
import { ReadFailure } from "./error_utils/ReadFailure";
import { ReadTimeout } from "./error_utils/ReadTimeout";
import { Unavailable } from "./error_utils/Unavailable";
import { Unprepared } from "./error_utils/Unprepared";
import { WriteFailure } from "./error_utils/WriteFailure";
import { WriteTimeout } from "./error_utils/WriteTimeout";
export class ProtocolErrorSubCodec {
    errorCode;
    protocolVersion;
    constructor(errorCode, protocolVersion) {
        this.errorCode = errorCode;
        this.protocolVersion = protocolVersion;
    }
    encode(dest, message, encoder) {
        throw new Error("Method not implemented");
    }
    encodedSize(message) {
        throw new Error("Method not implemented");
    }
    decode(source, decoder) {
        throw new Error("Method not implemented");
    }
}
class SingleMessageSubCodec extends ProtocolErrorSubCodec {
    constructor(errorCode, protocolVersion) {
        super(errorCode, protocolVersion);
    }
    encode(dest, message, encoder) {
        const error = message;
        encoder.writeString(error.message, dest);
    }
    encodedSize(message) {
        const error = message;
        return PrimitiveSizes.sizeOfString(error.message);
    }
    decode(source, decoder) {
        const message = decoder.readString(source);
        return new ProtocolError(this.errorCode, message);
    }
}
export class ProtocolError extends ProtocolMessage {
    code;
    message;
    constructor(code, message) {
        super(true, ProtocolConstants.Opcode.ERROR);
        this.code = code;
        this.message = message;
    }
    toString() {
        return `ERROR(${this.message})`;
    }
    static Codec = class extends ProtocolMessageCodec {
        subCodecs;
        constructor(protocolVersion, ...subCodecs) {
            super(ProtocolConstants.Opcode.ERROR, protocolVersion);
            if (!subCodecs || subCodecs.length == 0) {
                subCodecs = [
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.SERVER_ERROR, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.PROTOCOL_ERROR, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.AUTH_ERROR, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.OVERLOADED, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.IS_BOOTSTRAPPING, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.TRUNCATE_ERROR, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.SYNTAX_ERROR, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.UNAUTHORIZED, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.INVALID, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.CONFIG_ERROR, protocolVersion),
                    new SingleMessageSubCodec(ProtocolConstants.ErrorCode.CDC_WRITE_FAILURE, protocolVersion),
                    new Unavailable.SubCodec(protocolVersion),
                    new WriteTimeout.SubCodec(protocolVersion),
                    new ReadTimeout.SubCodec(protocolVersion),
                    new ReadFailure.SubCodec(protocolVersion),
                    new FunctionFailure.SubCodec(protocolVersion),
                    new WriteFailure.SubCodec(protocolVersion),
                    new AlreadyExists.SubCodec(protocolVersion),
                    new Unprepared.SubCodec(protocolVersion),
                    new CASWriteUnknown.SubCodec(protocolVersion),
                ];
            }
            this.subCodecs = new IntMap();
            subCodecs.forEach((subCodec) => {
                this.subCodecs.set(subCodec.errorCode, subCodec);
            });
        }
        encode(dest, message, encoder) {
            const error = message;
            encoder.writeInt(error.code, dest);
            this.getSubCodec(error.code).encode(dest, message, encoder);
        }
        encodedSize(message) {
            const error = message;
            return (PrimitiveSizes.INT + this.getSubCodec(error.code).encodedSize(message));
        }
        decode(source, decoder) {
            const errorCode = decoder.readInt(source);
            return this.getSubCodec(errorCode).decode(source, decoder);
        }
        getSubCodec(errorCode) {
            const subCodec = this.subCodecs.get(errorCode);
            if (!subCodec) {
                throw new IllegalArgumentError(`Unsupported error code: ${errorCode}`);
            }
            return subCodec;
        }
    };
    static SubCodec = ProtocolErrorSubCodec;
    static SingleMessageSubCodec = SingleMessageSubCodec;
}
