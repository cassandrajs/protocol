import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { IntMapBuilder } from "../util/IntMap";
import { ProtocolConstants } from "../util/ProtocolConstants";
import { DefaultRows } from "./result_utils/DefaultRows";
import { Prepared } from "./result_utils/Prepared";
import { SchemaChange } from "./result_utils/SchemaChange";
import { SetKeyspace } from "./result_utils/SetKeyspace";
import { VoidResult } from "./result_utils/Void";
export class ResultSubCodec {
    kind;
    protocolVersion;
    constructor(kind, protocolVersion) {
        this.kind = kind;
        this.protocolVersion = protocolVersion;
    }
    encode(dest, message, encoder) {
        throw new Error("Method not implemented.");
    }
    encodedSize(message) {
        throw new Error("Method not implemented.");
    }
    decode(source, decoder) {
        throw new Error("Method not implemented.");
    }
}
export class Result extends ProtocolMessage {
    kind;
    constructor(kind) {
        super(true, ProtocolConstants.Opcode.RESULT);
        this.kind = kind;
    }
    static Codec = class extends ProtocolMessageCodec {
        subDecoders;
        constructor(protocolVersion, ...subCodecs) {
            super(ProtocolConstants.Opcode.RESULT, protocolVersion);
            if (!subCodecs || subCodecs.length == 0) {
                subCodecs = [
                    new VoidResult.SubCodec(protocolVersion),
                    new DefaultRows.SubCodec(protocolVersion),
                    new SetKeyspace.SubCodec(protocolVersion),
                    new Prepared.SubCodec(protocolVersion),
                    new SchemaChange.SubCodec(protocolVersion),
                ];
            }
            const builder = new IntMapBuilder();
            for (const subCodec of subCodecs) {
                builder.put(subCodec.kind, subCodec);
            }
            this.subDecoders = builder.build();
        }
        encode(dest, message, encoder) {
            const result = message;
            encoder.writeInt(result.kind, dest);
            this.getSubCodec(result.kind).encode(dest, result, encoder);
        }
        encodedSize(message) {
            const result = message;
            return (PrimitiveSizes.INT + this.getSubCodec(result.kind).encodedSize(result));
        }
        decode(source, decoder) {
            const kind = decoder.readInt(source);
            return this.getSubCodec(kind).decode(source, decoder);
        }
        getSubCodec(kind) {
            const subCodec = this.subDecoders.get(kind);
            if (!subCodec) {
                throw new Error(`Unsupported result kind: ${kind}`);
            }
            return subCodec;
        }
    };
    static SubCodec = ResultSubCodec;
}
