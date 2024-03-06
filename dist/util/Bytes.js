export class Bytes {
    static toHexString(bytes) {
        return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    }
    static fromHexString(hexString) {
        const chunks = hexString.match(/.{1,2}/g) || [];
        return new Uint8Array(chunks.map((chunk) => parseInt(chunk, 16)));
    }
    static readInt32BE(buf, offset) {
        if (offset + 4 > buf.length) {
            throw new RangeError("Index out of range");
        }
        return ((buf[offset] << 24) | // Shift left then sign-extend to 32-bits
            (buf[offset + 1] << 16) |
            (buf[offset + 2] << 8) |
            buf[offset + 3]);
    }
    static readUInt32BE(buf, offset) {
        if (offset + 4 > buf.length) {
            throw new RangeError("Index out of range");
        }
        return (((buf[offset] << 24) >>> 0) + // Shift left to make room for the next byte, `>>> 0` enforces unsigned shift
            ((buf[offset + 1] << 16) | (buf[offset + 2] << 8) | buf[offset + 3]));
    }
    static writeInt16BE(buf, value, offset) {
        if (offset + 2 > buf.length) {
            throw new RangeError("Index out of range");
        }
        buf[offset] = (value >> 8) & 255; // Most significant byte (MSB), with sign preserved
        buf[offset + 1] = value & 255; // Least significant byte (LSB), without shifting
    }
    static writeInt32BE(buf, value, offset) {
        if (offset + 4 > buf.length) {
            throw new RangeError("Index out of range");
        }
        buf[offset] = (value >> 24) & 255; // Right shift to position the MSB, mask to get the last 8 bits
        buf[offset + 1] = (value >> 16) & 255;
        buf[offset + 2] = (value >> 8) & 255;
        buf[offset + 3] = value & 255; // Mask without shifting to get the LSB
    }
    static writeUInt16BE(buf, value, offset) {
        if (offset + 2 > buf.length) {
            throw new RangeError("Index out of range");
        }
        buf[offset] = (value >>> 8) & 255; // Most significant byte (MSB)
        buf[offset + 1] = value & 255; // Least significant byte (LSB)
    }
    static writeUInt32BE(buf, value, offset) {
        if (offset + 4 > buf.length) {
            throw new RangeError("Index out of range");
        }
        buf[offset] = (value >>> 24) & 255; // Most significant byte (MSB)
        buf[offset + 1] = (value >>> 16) & 255;
        buf[offset + 2] = (value >>> 8) & 255;
        buf[offset + 3] = value & 255; // Least significant byte (LSB)
    }
}
