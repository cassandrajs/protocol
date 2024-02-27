import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class Startup extends ProtocolMessage {
    static CQL_VERSION_KEY = "CQL_VERSION";
    static COMPRESSION_KEY = "COMPRESSION";
    static CQL_VERSION = "3.0.0";
    options;
    constructor(options) {
        super(false, ProtocolConstants.Opcode.STARTUP);
        if (typeof options === "string") {
            const compressionAlgorithm = options;
            if (compressionAlgorithm === null || compressionAlgorithm === "") {
                options = {};
                options[Startup.CQL_VERSION_KEY] = Startup.CQL_VERSION;
            }
            else {
                options = {};
                options[Startup.CQL_VERSION_KEY] = Startup.CQL_VERSION;
                options[Startup.COMPRESSION_KEY] = compressionAlgorithm;
            }
        }
        if (typeof options !== "object") {
            options = {};
            options[Startup.CQL_VERSION_KEY] = Startup.CQL_VERSION;
        }
        if (!options[Startup.CQL_VERSION_KEY]) {
            const inOptions = options;
            options = {};
            options[Startup.CQL_VERSION_KEY] = Startup.CQL_VERSION;
            options = { ...options, ...inOptions };
        }
        this.options = options;
    }
    toString() {
        return `STARTUP ${this.options}`;
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.STARTUP, protocolVersion);
        }
        encode(dest, message, encoder) {
            const startup = message;
            encoder.writeStringMap(startup.options, dest);
        }
        encodedSize(message) {
            const startup = message;
            return PrimitiveSizes.sizeOfStringMap(startup.options);
        }
        decode(source, decoder) {
            const map = decoder.readStringMap(source);
            return new Startup(map);
        }
    };
}
