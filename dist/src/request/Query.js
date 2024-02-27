import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
import { QueryOptions } from "./query_utils/QueryOptions";
export class Query extends ProtocolMessage {
    query;
    options;
    constructor(query, options = QueryOptions.DEFAULT) {
        super(false, ProtocolConstants.Opcode.QUERY);
        this.query = query;
        this.options = options;
    }
    toString() {
        return `QUERY (${this.query})`;
    }
    static Codec = class extends ProtocolMessageCodec {
        optionsCodec;
        constructor(protocolVersion, optionsCodec) {
            super(ProtocolConstants.Opcode.QUERY, protocolVersion);
            this.optionsCodec =
                optionsCodec ?? new QueryOptions.Codec(protocolVersion);
        }
        encode(dest, message, encoder) {
            const query = message;
            encoder.writeLongString(query.query, dest);
            this.optionsCodec.encode(dest, query.options, encoder);
        }
        encodedSize(message) {
            const query = message;
            return (PrimitiveSizes.sizeOfLongString(query.query) +
                this.optionsCodec.encodedSize(query.options));
        }
        decode(source, decoder) {
            const query = decoder.readLongString(source);
            const options = this.optionsCodec.decode(source, decoder);
            return new Query(query, options);
        }
    };
}
