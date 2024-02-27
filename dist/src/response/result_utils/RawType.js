import { PrimitiveSizes } from "../../PrimitiveSizes";
import { HashMap } from "../../util/HashMap";
import { HashObject } from "../../util/HashObject";
import { ProtocolConstants, } from "../../util/ProtocolConstants";
export class ARawType {
    id; // DataType ID
    constructor(id) {
        this.id = id;
    }
    static decode(source, decoder, protocolVersion) {
        throw new Error("Not implemented");
    }
    encode(dest, encoder, protocolVersion) {
        throw new Error("Not implemented");
    }
    encodedSize(protocolVersion) {
        throw new Error("Not implemented");
    }
    equals(other) {
        if (this === other) {
            return true;
        }
        return this.id === other.id;
    }
    hashCode() {
        return this.id;
    }
}
class TheRawPrimitive extends ARawType {
    constructor(id) {
        super(id);
    }
    encode(dest, encoder, protocolVersion) {
        encoder.writeUnsignedShort(this.id, dest);
    }
    encodedSize(protocolVersion) {
        return PrimitiveSizes.SHORT;
    }
}
const PRIMITIVES = new HashMap([
    ProtocolConstants.DataType.ASCII,
    ProtocolConstants.DataType.BIGINT,
    ProtocolConstants.DataType.BLOB,
    ProtocolConstants.DataType.BOOLEAN,
    ProtocolConstants.DataType.COUNTER,
    ProtocolConstants.DataType.DECIMAL,
    ProtocolConstants.DataType.DOUBLE,
    ProtocolConstants.DataType.FLOAT,
    ProtocolConstants.DataType.INET,
    ProtocolConstants.DataType.INT,
    ProtocolConstants.DataType.TIMESTAMP,
    ProtocolConstants.DataType.UUID,
    ProtocolConstants.DataType.VARCHAR,
    ProtocolConstants.DataType.VARINT,
    ProtocolConstants.DataType.TIMEUUID,
    ProtocolConstants.DataType.SMALLINT,
    ProtocolConstants.DataType.TINYINT,
    ProtocolConstants.DataType.DURATION,
    ProtocolConstants.DataType.DATE,
    ProtocolConstants.DataType.TIME,
].map((id) => {
    return [id, new TheRawPrimitive(id)];
}));
export class RawType extends ARawType {
    static decode(source, decoder, protocolVersion) {
        const id = decoder.readUnsignedShort(source);
        switch (id) {
            case ProtocolConstants.DataType.CUSTOM:
                const className = decoder.readString(source);
                return new RawType.RawCustom(className);
            case ProtocolConstants.DataType.LIST:
                return new RawType.RawList(this.decode(source, decoder, protocolVersion));
            case ProtocolConstants.DataType.SET:
                return new RawType.RawSet(this.decode(source, decoder, protocolVersion));
            case ProtocolConstants.DataType.MAP:
                const key = this.decode(source, decoder, protocolVersion);
                const value = this.decode(source, decoder, protocolVersion);
                return new RawType.RawMap(key, value);
            case ProtocolConstants.DataType.UDT:
                const keyspace = decoder.readString(source);
                const typeName = decoder.readString(source);
                let fieldCount = decoder.readUnsignedShort(source);
                let fields = {};
                for (let i = 0; i < fieldCount; i++) {
                    const fieldName = decoder.readString(source);
                    const fieldType = this.decode(source, decoder, protocolVersion);
                    fields[fieldName] = fieldType;
                }
                return new RawType.RawUdt(keyspace, typeName, fields);
            case ProtocolConstants.DataType.TUPLE:
                fieldCount = decoder.readUnsignedShort(source);
                let fieldTypes = [];
                for (let i = 0; i < fieldCount; i++) {
                    fieldTypes.push(this.decode(source, decoder, protocolVersion));
                }
                return new RawType.RawTuple(fieldTypes);
            default:
                const type = PRIMITIVES.get(id);
                if (type === undefined) {
                    throw new Error(`Unknown type id: ${id}`);
                }
                return type;
        }
    }
    encode(dest, encoder, protocolVersion) {
        throw new Error("Method not implemented.");
    }
    encodedSize(protocolVersion) {
        throw new Error("Method not implemented.");
    }
    static RawPrimitive = TheRawPrimitive;
    static RawCustom = class extends RawType {
        className;
        constructor(className) {
            super(ProtocolConstants.DataType.CUSTOM);
            this.className = className;
        }
        encode(dest, encoder, protocolVersion) {
            encoder.writeUnsignedShort(this.id, dest);
            encoder.writeString(this.className, dest);
        }
        encodedSize(protocolVersion) {
            return PrimitiveSizes.SHORT + PrimitiveSizes.sizeOfString(this.className);
        }
        equals(o) {
            if (this === o) {
                return true;
            }
            if (!o || !(o instanceof RawType.RawCustom)) {
                return false;
            }
            if (!super.equals(o)) {
                return false;
            }
            return this.className === o.className;
        }
        hashCode() {
            let result = super.hashCode();
            result = 31 * result + (this.className ? HashObject(this.className) : 0);
            return result;
        }
    };
    static RawList = class extends RawType {
        elementType;
        constructor(elementType) {
            super(ProtocolConstants.DataType.LIST);
            this.elementType = elementType;
        }
        encode(dest, encoder, protocolVersion) {
            encoder.writeUnsignedShort(this.id, dest);
            this.elementType.encode(dest, encoder, protocolVersion);
        }
        encodedSize(protocolVersion) {
            return (PrimitiveSizes.SHORT + this.elementType.encodedSize(protocolVersion));
        }
        equals(o) {
            if (this === o) {
                return true;
            }
            if (o === null || this.constructor !== o.constructor) {
                return false;
            }
            if (!super.equals(o)) {
                return false;
            }
            const rawList = o;
            return this.elementType.equals(rawList.elementType);
        }
        hashCode() {
            let result = super.hashCode();
            result = 31 * result + this.elementType.hashCode();
            return result;
        }
    };
    static RawSet = class extends RawType {
        elementType;
        constructor(elementType) {
            super(ProtocolConstants.DataType.SET);
            this.elementType = elementType;
        }
        encode(dest, encoder, protocolVersion) {
            encoder.writeUnsignedShort(this.id, dest);
            this.elementType.encode(dest, encoder, protocolVersion);
        }
        encodedSize(protocolVersion) {
            return (PrimitiveSizes.SHORT + this.elementType.encodedSize(protocolVersion));
        }
        equals(o) {
            if (this === o)
                return true;
            if (!o || this.constructor !== o.constructor)
                return false;
            if (!super.equals(o))
                return false;
            const other = o;
            return this.elementType.equals(other.elementType);
        }
        hashCode() {
            let result = super.hashCode();
            result = 31 * result + this.elementType.hashCode();
            return result;
        }
    };
    static RawMap = class extends RawType {
        keyType;
        valueType;
        constructor(keyType, valueType) {
            super(ProtocolConstants.DataType.MAP);
            this.keyType = keyType;
            this.valueType = valueType;
        }
        encode(dest, encoder, protocolVersion) {
            encoder.writeUnsignedShort(this.id, dest);
            this.keyType.encode(dest, encoder, protocolVersion);
            this.valueType.encode(dest, encoder, protocolVersion);
        }
        encodedSize(protocolVersion) {
            return (PrimitiveSizes.SHORT +
                this.keyType.encodedSize(protocolVersion) +
                this.valueType.encodedSize(protocolVersion));
        }
        equals(o) {
            if (this === o) {
                return true;
            }
            if (!(o instanceof RawType.RawMap)) {
                return false;
            }
            if (!super.equals(o)) {
                return false;
            }
            let rawMap = o;
            return (this.keyType.equals(rawMap.keyType) &&
                this.valueType.equals(rawMap.valueType));
        }
        hashCode() {
            let result = super.hashCode();
            result = 31 * result + this.keyType.hashCode();
            result = 31 * result + this.valueType.hashCode();
            return result;
        }
    };
    static RawUdt = class extends RawType {
        keyspace;
        typeName;
        fields;
        constructor(keyspace, typeName, fields) {
            super(ProtocolConstants.DataType.UDT);
            this.keyspace = keyspace;
            this.typeName = typeName;
            this.fields = fields;
        }
        encode(dest, encoder, protocolVersion) {
            encoder.writeUnsignedShort(this.id, dest);
            encoder.writeString(this.keyspace, dest);
            encoder.writeString(this.typeName, dest);
            encoder.writeUnsignedShort(Object.keys(this.fields).length, dest);
            Object.entries(this.fields).forEach(([key, value]) => {
                encoder.writeString(key, dest);
                value.encode(dest, encoder, protocolVersion);
            });
        }
        encodedSize(protocolVersion) {
            let size = PrimitiveSizes.SHORT +
                PrimitiveSizes.sizeOfString(this.keyspace) +
                PrimitiveSizes.sizeOfString(this.typeName) +
                PrimitiveSizes.SHORT;
            Object.entries(this.fields).forEach(([key, value]) => {
                size += PrimitiveSizes.sizeOfString(key);
                size += value.encodedSize(protocolVersion);
            });
            return size;
        }
        equals(o) {
            if (this === o) {
                return true;
            }
            if (!o || this.constructor !== o.constructor) {
                return false;
            }
            if (!super.equals(o)) {
                return false;
            }
            const other = o;
            return (this.keyspace === other.keyspace &&
                this.typeName === other.typeName &&
                this.fieldsEqual(other.fields));
        }
        fieldsEqual(otherFields) {
            const thisFieldKeys = Object.keys(this.fields);
            const otherFieldKeys = Object.keys(otherFields);
            if (thisFieldKeys.length !== otherFieldKeys.length) {
                return false;
            }
            for (const key of thisFieldKeys) {
                if (!this.fields[key].equals(otherFields[key])) {
                    return false;
                }
            }
            return true;
        }
        hashCode() {
            let result = super.hashCode();
            result = 31 * result + HashObject(this.keyspace);
            result = 31 * result + HashObject(this.typeName);
            result =
                31 * result +
                    Object.values(this.fields).reduce((acc, rawType) => acc + rawType.hashCode(), 0);
            return result;
        }
    };
    static RawTuple = class extends RawType {
        fieldTypes;
        constructor(fieldTypes) {
            super(ProtocolConstants.DataType.TUPLE);
            this.fieldTypes = fieldTypes;
        }
        encode(dest, encoder, protocolVersion) {
            encoder.writeUnsignedShort(this.id, dest);
            encoder.writeUnsignedShort(this.fieldTypes.length, dest);
            this.fieldTypes.forEach((fieldType) => {
                fieldType.encode(dest, encoder, protocolVersion);
            });
        }
        encodedSize(protocolVersion) {
            let size = PrimitiveSizes.SHORT + PrimitiveSizes.SHORT;
            this.fieldTypes.forEach((fieldType) => {
                size += fieldType.encodedSize(protocolVersion);
            });
            return size;
        }
        equals(o) {
            if (this === o) {
                return true;
            }
            if (!o || this.constructor !== o.constructor) {
                return false;
            }
            if (!super.equals(o)) {
                return false;
            }
            const other = o;
            return (this.fieldTypes.length === other.fieldTypes.length &&
                this.fieldTypes.every((type, i) => type.equals(other.fieldTypes[i])));
        }
        hashCode() {
            let result = super.hashCode();
            result =
                31 * result +
                    this.fieldTypes.reduce((hash, type) => hash + type.hashCode(), 0);
            return result;
        }
    };
}
