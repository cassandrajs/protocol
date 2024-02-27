import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
export class Prepare extends ProtocolMessage {
    cqlQuery;
    keyspace;
    constructor(cqlQuery, keyspace) {
        super(false, ProtocolConstants.Opcode.PREPARE);
        this.cqlQuery = cqlQuery;
        this.keyspace = keyspace;
    }
    toString() {
        return `PREPARE(${this.cqlQuery}, ${this.keyspace})`;
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.PREPARE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const prepare = message;
            encoder.writeLongString(prepare.cqlQuery, dest);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                // There is only one PREPARE flag for now, so hard-code for simplicity:
                encoder.writeInt(prepare.keyspace ? 0x01 : 0x00, dest);
                if (prepare.keyspace) {
                    encoder.writeString(prepare.keyspace, dest);
                }
            }
        }
        encodedSize(message) {
            const prepare = message;
            let size = PrimitiveSizes.sizeOfLongString(prepare.cqlQuery);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                size += PrimitiveSizes.INT; // flags
                if (prepare.keyspace) {
                    size += PrimitiveSizes.sizeOfString(prepare.keyspace);
                }
            }
            return size;
        }
        decode(source, decoder) {
            const cqlQuery = decoder.readLongString(source);
            let keyspace = null;
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                const flags = decoder.readInt(source);
                if (flags & 0x01) {
                    keyspace = decoder.readString(source);
                }
            }
            return new Prepare(cqlQuery, keyspace);
        }
    };
}
