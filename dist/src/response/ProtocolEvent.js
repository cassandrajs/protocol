import { IllegalArgumentError } from "../errors/IllegalArgumentError";
import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
import { SchemaChangeEvent } from "./event_utils/SchemaChangeEvent";
import { StatusChangeEvent } from "./event_utils/StatusChangeEvent";
import { TopologyChangeEvent } from "./event_utils/TopologyChangeEvent";
export class ProtocolEventSubCodec {
    type;
    protocolVersion;
    constructor(type, protocolVersion) {
        this.type = type;
        this.protocolVersion = protocolVersion;
    }
    encode(dest, message, encoder) {
        // To be implemented in concrete subclasses
    }
    encodedSize(message) {
        // To be implemented in concrete subclasses
        return -1;
    }
    decode(source, decoder) {
        // To be implemented in concrete subclasses
        return null;
    }
}
export class ProtocolEvent extends ProtocolMessage {
    type;
    constructor(type) {
        super(true, ProtocolConstants.Opcode.EVENT);
        this.type = type;
    }
    static Codec = class extends ProtocolMessageCodec {
        subDecoders;
        constructor(protocolVersion, ...subCodecs) {
            super(ProtocolConstants.Opcode.EVENT, protocolVersion);
            if (subCodecs.length == 0) {
                subCodecs = [
                    new TopologyChangeEvent.SubCodec(protocolVersion),
                    new StatusChangeEvent.SubCodec(protocolVersion),
                    new SchemaChangeEvent.SubCodec(protocolVersion),
                ];
            }
            const tmp = new Map();
            subCodecs.forEach((subCodec) => {
                tmp.set(subCodec.type, subCodec);
            });
            this.subDecoders = new Map(tmp);
        }
        encode(dest, message, encoder) {
            const event = message;
            encoder.writeString(event.type, dest);
            this.getSubCodec(event.type).encode(dest, message, encoder);
        }
        encodedSize(message) {
            const event = message;
            return (PrimitiveSizes.sizeOfString(event.type) +
                this.getSubCodec(event.type).encodedSize(message));
        }
        decode(source, decoder) {
            const type = decoder.readString(source);
            return this.getSubCodec(type).decode(source, decoder);
        }
        getSubCodec(type) {
            const subCodec = this.subDecoders.get(type);
            if (!subCodec) {
                throw new IllegalArgumentError(`Unsupported event type: ${type}`);
            }
            return subCodec;
        }
    };
    static SubCodec = ProtocolEventSubCodec;
}
