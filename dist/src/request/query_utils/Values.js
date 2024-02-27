import { PrimitiveSizes } from "../../PrimitiveSizes";
import { ProtocolConstants } from "../../util/ProtocolConstants";
export class Values {
    static writePositionalValues(values, dest, encoder) {
        encoder.writeUnsignedShort(values.length, dest);
        for (const value of values) {
            Values.writeValue(value, dest, encoder);
        }
    }
    static sizeOfPositionalValues(values) {
        let size = PrimitiveSizes.SHORT;
        for (const value of values) {
            size += Values.sizeOfValue(value);
        }
        return size;
    }
    static writeNamedValues(values, dest, encoder) {
        encoder.writeUnsignedShort(Object.keys(values).length, dest);
        for (const [key, value] of Object.entries(values)) {
            encoder.writeString(key, dest);
            Values.writeValue(value, dest, encoder);
        }
    }
    static sizeOfNamedValues(values) {
        let size = PrimitiveSizes.SHORT;
        for (const [key, value] of Object.entries(values)) {
            size += PrimitiveSizes.sizeOfString(key);
            size += Values.sizeOfValue(value);
        }
        return size;
    }
    static writeValue(value, dest, encoder) {
        if (!value) {
            encoder.writeInt(-1, dest);
        }
        else if (value === ProtocolConstants.UNSET_VALUE) {
            encoder.writeInt(-2, dest);
        }
        else {
            encoder.writeBytes(value, dest);
        }
    }
    static sizeOfValue(value) {
        return !value || value === ProtocolConstants.UNSET_VALUE
            ? PrimitiveSizes.INT
            : PrimitiveSizes.sizeOfBytes(value);
    }
    static readPositionalValues(source, decoder) {
        const size = decoder.readUnsignedShort(source);
        if (size === 0) {
            return [];
        }
        else {
            const values = [];
            for (let i = 0; i < size; i++) {
                values.push(Values.readValue(source, decoder));
            }
            return values;
        }
    }
    static readNamedValues(source, decoder) {
        const size = decoder.readUnsignedShort(source);
        if (size === 0) {
            return {};
        }
        else {
            const values = {};
            for (let i = 0; i < size; i++) {
                const key = decoder.readString(source);
                const value = Values.readValue(source, decoder);
                values[key] = value;
            }
            return values;
        }
    }
    static readValue(source, decoder) {
        return decoder.readBytes(source);
    }
}
