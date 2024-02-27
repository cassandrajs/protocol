import { IllegalArgumentError } from "../../src/errors/IllegalArgumentError";
import { PrimitiveCodec } from "../../src/PrimitiveCodec";
import { Bytes } from "../../src/util/Bytes";
import { MockBinaryString } from "./MockBinaryString";
import { MockBinaryStringElement } from "./MockBinaryStringElement";
export class MockPrimitiveCodec extends PrimitiveCodec {
    static INSTANCE = new MockPrimitiveCodec();
    allocate = (size) => new MockBinaryString();
    release = (toRelease) => { };
    sizeOf = (toMeasure) => toMeasure.size();
    resetReaderIndex = (source) => source.resetReaderIndex();
    markReaderIndex = (source) => source.markReaderIndex();
    concat = (left, right) => left.append(right);
    readByte = (source) => this.pop(source, MockBinaryStringElement.Type.BYTE);
    readInt(source, offset) {
        if (!offset)
            return this.pop(source, MockBinaryStringElement.Type.INT);
        const copy = source.copy();
        let skipped = 0;
        while (skipped < offset) {
            const element = copy.pop();
            skipped += element.size();
        }
        if (skipped != offset) {
            throw new IllegalArgumentError("Offset must match an exact number of elements");
        }
        return this.readInt(copy);
    }
    readInetAddr = (source) => this.pop(source, MockBinaryStringElement.Type.INETADDR);
    readLong = (source) => this.pop(source, MockBinaryStringElement.Type.LONG);
    readUnsignedShort = (source) => this.pop(source, MockBinaryStringElement.Type.UNSIGNED_SHORT);
    readBytes = (source) => Bytes.fromHexString(this.pop(source, MockBinaryStringElement.Type.BYTES));
    readShortBytes = (source) => [
        ...Bytes.fromHexString(this.pop(source, MockBinaryStringElement.Type.SHORT_BYTES)),
    ];
    readString = (source) => this.pop(source, MockBinaryStringElement.Type.STRING);
    readLongString = (source) => this.pop(source, MockBinaryStringElement.Type.LONG_STRING);
    readRetainedSlice = (source, sliceLength) => source.slice(sliceLength);
    updateCrc(source, crc) {
        const source2 = source.copy(); // don't consume the input
        let element;
        while ((element = source2.pollFirst()) != null) {
            if (element.type == MockBinaryStringElement.Type.BYTE) {
                crc.update(element.value & 0xff);
            }
            else {
                throw new IllegalArgumentError("PrimitiveCodec.updateCrc() is only supported on MockBinaryStrings that were assembled byte-by-byte. " +
                    "Unexpected type " +
                    element.type);
            }
        }
    }
    writeByte(b, dest) {
        dest.byte_(b);
    }
    writeInt(i, dest) {
        dest.int_(i);
    }
    writeInetAddr(address, dest) {
        dest.inetAddr(address);
    }
    writeLong(l, dest) {
        dest.long_(l);
    }
    writeUnsignedShort(i, dest) {
        dest.unsignedShort(i);
    }
    writeString(s, dest) {
        dest.string(s);
    }
    writeLongString(s, dest) {
        dest.longString(s);
    }
    writeBytes(bytes, dest) {
        dest.bytes(!bytes ? "0x" : Bytes.toHexString(bytes));
    }
    writeShortBytes(bytes, dest) {
        dest.shortBytes(Bytes.toHexString(bytes));
    }
    pop(source, expectedType) {
        const element = source.pop();
        if (!(element.type === expectedType)) {
            throw new IllegalArgumentError(`source element type does not match expectedType`);
        }
        return element.value;
    }
}
