import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolEvent, ProtocolEventSubCodec } from "../ProtocolEvent";
export class TopologyChangeEvent extends ProtocolEvent {
    changeType;
    address;
    constructor(changeType, address) {
        super(ProtocolConstants.EventType.TOPOLOGY_CHANGE);
        this.changeType = changeType;
        this.address = address;
    }
    toString() {
        return `EVENT TOPOLOGY_CHANGE(${this.changeType} ${this.address})`;
    }
    static SubCodec = class extends ProtocolEventSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.EventType.TOPOLOGY_CHANGE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const event = message;
            encoder.writeString(event.changeType, dest);
            encoder.writeInet(event.address, dest);
        }
        encodedSize(message) {
            const event = message;
            return (PrimitiveSizes.sizeOfString(event.changeType) +
                PrimitiveSizes.sizeOfInet(event.address));
        }
        decode(source, decoder) {
            const changeType = decoder.readString(source);
            const address = decoder.readInet(source);
            return new TopologyChangeEvent(changeType, address);
        }
    };
}
