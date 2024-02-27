export class ByteString {
    bytes;
    constructor(bytes) {
        this.bytes = bytes;
    }
    static EMPTY = new ByteString(new Uint8Array(0));
    static copyFrom(bytes, offset = 0, size) {
        if (size === undefined) {
            size = bytes.length;
        }
        const slice = new Uint8Array(bytes.slice(offset, offset + size));
        return new ByteString(slice);
    }
    byteAt(index) {
        return this.bytes[index];
    }
    size() {
        return this.bytes.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    toByteArray() {
        return this.bytes.slice();
    }
    substring(beginIndex, endIndex) {
        return new ByteString(this.bytes.slice(beginIndex, endIndex));
    }
    concat(other) {
        const concatenated = new Uint8Array(this.size() + other.size());
        concatenated.set(this.bytes, 0);
        concatenated.set(other.bytes, this.size());
        return new ByteString(concatenated);
    }
    copyTo(bytes, targetStart = 0, sourceStart = 0, sourceEnd) {
        const slice = this.bytes.slice(sourceStart, sourceEnd);
        bytes.set(slice, targetStart);
    }
    toStringUtf8() {
        return new TextDecoder("utf-8").decode(this.bytes);
    }
    static copyFromUtf8(text) {
        const encoder = new TextEncoder();
        return new ByteString(encoder.encode(text));
    }
    equals(other) {
        if (this.size() !== other.size()) {
            return false;
        }
        for (let i = 0; i < this.size(); i++) {
            if (this.byteAt(i) !== other.byteAt(i)) {
                return false;
            }
        }
        return true;
    }
    hashCode() {
        let hash = 0;
        for (const byte of this.bytes) {
            hash = (hash * 31 + byte) | 0; // Force overflow to 32-bit int
        }
        return hash;
    }
}
