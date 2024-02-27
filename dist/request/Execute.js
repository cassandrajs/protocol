import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { Bytes } from "../util/Bytes";
import { ProtocolConstants } from "../util/ProtocolConstants";
import { QueryOptions } from "./query_utils/QueryOptions";
export class Execute extends ProtocolMessage {
    queryId;
    resultMetadataId;
    options;
    constructor(queryId, resultMetadataId, options) {
        super(false, ProtocolConstants.Opcode.EXECUTE);
        this.queryId = queryId;
        this.resultMetadataId = resultMetadataId;
        this.options = options;
    }
    toString() {
        return `EXECUTE(${Bytes.toHexString(this.queryId)})`;
    }
    static Codec = class extends ProtocolMessageCodec {
        optionsCodec;
        constructor(protocolVersion, optionsCodec) {
            super(ProtocolConstants.Opcode.EXECUTE, protocolVersion);
            this.optionsCodec =
                optionsCodec || new QueryOptions.Codec(protocolVersion);
        }
        encode(dest, message, encoder) {
            const execute = message;
            encoder.writeShortBytes(execute.queryId, dest);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                encoder.writeShortBytes(execute.resultMetadataId, dest);
            }
            this.optionsCodec.encode(dest, execute.options, encoder);
        }
        encodedSize(message) {
            const execute = message;
            let size = PrimitiveSizes.sizeOfShortBytes(execute.queryId);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                if (execute.resultMetadataId) {
                    size += PrimitiveSizes.sizeOfShortBytes(execute.resultMetadataId);
                }
            }
            size += this.optionsCodec.encodedSize(execute.options);
            return size;
        }
        decode(source, decoder) {
            const queryId = decoder.readShortBytes(source);
            const resultMetadataId = this.protocolVersion >= ProtocolConstants.Version.V5
                ? decoder.readShortBytes(source)
                : null;
            const options = this.optionsCodec.decode(source, decoder);
            return new Execute(queryId, resultMetadataId, options);
        }
    };
}
