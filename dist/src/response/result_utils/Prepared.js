import { PrimitiveSizes } from "../../PrimitiveSizes";
import { Bytes } from "../../util/Bytes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { Result, ResultSubCodec } from "../Result";
import { RowsMetadata } from "./RowsMetadata";
export class Prepared extends Result {
    preparedQueryId;
    resultMetadataId;
    variablesMetadata;
    resultMetadata;
    constructor(preparedQueryId, resultMetadataId, variablesMetadata, resultMetadata) {
        super(ProtocolConstants.ResultKind.PREPARED);
        this.preparedQueryId = preparedQueryId;
        this.resultMetadataId = resultMetadataId;
        this.variablesMetadata = variablesMetadata;
        this.resultMetadata = resultMetadata;
    }
    toString() {
        return `PREPARED(${Bytes.toHexString(this.preparedQueryId)})`;
    }
    static SubCodec = class extends ResultSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.ResultKind.PREPARED, protocolVersion);
        }
        encode(dest, message, encoder) {
            const prepared = message;
            encoder.writeShortBytes(prepared.preparedQueryId, dest);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                if (prepared.resultMetadataId) {
                    encoder.writeShortBytes(prepared.resultMetadataId, dest);
                }
            }
            const hasPkIndices = this.protocolVersion >= ProtocolConstants.Version.V4;
            prepared.variablesMetadata.encode(dest, encoder, hasPkIndices, this.protocolVersion);
            prepared.resultMetadata.encode(dest, encoder, false, this.protocolVersion);
        }
        encodedSize(message) {
            const prepared = message;
            let size = PrimitiveSizes.sizeOfShortBytes(prepared.preparedQueryId);
            if (this.protocolVersion >= ProtocolConstants.Version.V5 &&
                prepared.resultMetadataId) {
                size += PrimitiveSizes.sizeOfShortBytes(prepared.resultMetadataId);
            }
            const hasPkIndices = this.protocolVersion >= ProtocolConstants.Version.V4;
            size += prepared.variablesMetadata.encodedSize(hasPkIndices, this.protocolVersion);
            size += prepared.resultMetadata.encodedSize(false, this.protocolVersion);
            return size;
        }
        decode(source, decoder) {
            const preparedQueryId = decoder.readShortBytes(source);
            let resultMetadataId = null;
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                resultMetadataId = decoder.readShortBytes(source);
            }
            const hasPkIndices = this.protocolVersion >= ProtocolConstants.Version.V4;
            const variablesMetadata = RowsMetadata.decode(source, decoder, hasPkIndices, this.protocolVersion);
            const resultMetadata = RowsMetadata.decode(source, decoder, false, this.protocolVersion);
            return new Prepared(preparedQueryId, resultMetadataId, variablesMetadata, resultMetadata);
        }
    };
}
