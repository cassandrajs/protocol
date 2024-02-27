import { IllegalArgumentError } from "../../errors/IllegalArgumentError";
import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
import { ProtocolEvent, ProtocolEventSubCodec } from "../ProtocolEvent";
export class SchemaChangeEvent extends ProtocolEvent {
    changeType;
    target;
    keyspace;
    object;
    schemaArguments;
    constructor(changeType, target, keyspace, object, schemaArguments) {
        super(ProtocolConstants.EventType.SCHEMA_CHANGE);
        this.changeType = changeType;
        this.target = target;
        this.keyspace = keyspace;
        this.object = object;
        this.schemaArguments = schemaArguments;
    }
    toString() {
        return `EVENT SCHEMA_CHANGE(${this.changeType} ${this.target} ${this.keyspace}${this.object ? "." + this.object : ""}${this.schemaArguments ? this.schemaArguments.join(",") : ""})`;
    }
    static SubCodec = class extends ProtocolEventSubCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.EventType.SCHEMA_CHANGE, protocolVersion);
        }
        encode(dest, message, encoder) {
            const event = message;
            encoder.writeString(event.changeType, dest);
            encoder.writeString(event.target, dest);
            encoder.writeString(event.keyspace, dest);
            switch (event.target) {
                case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
                    break;
                case ProtocolConstants.SchemaChangeTarget.TABLE:
                case ProtocolConstants.SchemaChangeTarget.TYPE:
                    encoder.writeString(event.object, dest);
                    break;
                case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
                case ProtocolConstants.SchemaChangeTarget.FUNCTION:
                    encoder.writeString(event.object, dest);
                    encoder.writeStringList(event.schemaArguments, dest);
                    break;
                default:
                    throw new Error(`Unknown schema change target: ${event.target}`);
            }
        }
        encodedSize(message) {
            const event = message;
            if (!(this.protocolVersion >= ProtocolConstants.Version.V4 ||
                (event.target !== ProtocolConstants.SchemaChangeTarget.AGGREGATE &&
                    event.target !== ProtocolConstants.SchemaChangeTarget.FUNCTION))) {
                throw new IllegalArgumentError(`${event.target} schema change events are not supported in protocol version ${this.protocolVersion}`);
            }
            let size = PrimitiveSizes.sizeOfString(event.changeType);
            size += PrimitiveSizes.sizeOfString(event.target);
            size += PrimitiveSizes.sizeOfString(event.keyspace);
            switch (event.target) {
                case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
                    break;
                case ProtocolConstants.SchemaChangeTarget.TABLE:
                case ProtocolConstants.SchemaChangeTarget.TYPE:
                    size += PrimitiveSizes.sizeOfString(event.object);
                    break;
                case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
                case ProtocolConstants.SchemaChangeTarget.FUNCTION:
                    size += PrimitiveSizes.sizeOfString(event.object);
                    size += PrimitiveSizes.sizeOfStringList(event.schemaArguments);
                    break;
                default:
                    throw new Error(`Unknown schema change target: ${event.target}`);
            }
            return size;
        }
        decode(source, decoder) {
            const changeType = decoder.readString(source);
            const target = decoder.readString(source);
            if (!(this.protocolVersion >= ProtocolConstants.Version.V4 ||
                (target !== ProtocolConstants.SchemaChangeTarget.AGGREGATE &&
                    target !== ProtocolConstants.SchemaChangeTarget.FUNCTION))) {
                throw new IllegalArgumentError(`${target} schema change events are not supported in protocol version ${this.protocolVersion}`);
            }
            const keyspace = decoder.readString(source);
            let object = null;
            let schemaArguments = null;
            switch (target) {
                case ProtocolConstants.SchemaChangeTarget.KEYSPACE:
                    object = null;
                    schemaArguments = null;
                    break;
                case ProtocolConstants.SchemaChangeTarget.TABLE:
                case ProtocolConstants.SchemaChangeTarget.TYPE:
                    object = decoder.readString(source);
                    schemaArguments = null;
                    break;
                case ProtocolConstants.SchemaChangeTarget.AGGREGATE:
                case ProtocolConstants.SchemaChangeTarget.FUNCTION:
                    object = decoder.readString(source);
                    schemaArguments = decoder.readStringList(source);
                    break;
                default:
                    throw new Error(`Unknown schema change target: ${target}`);
            }
            return new SchemaChangeEvent(changeType, target, keyspace, object, schemaArguments);
        }
    };
}
