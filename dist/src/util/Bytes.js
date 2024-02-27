export class Bytes {
    static toHexString(bytes) {
        return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    }
    static fromHexString(hexString) {
        const chunks = hexString.match(/.{1,2}/g) || [];
        return new Uint8Array(chunks.map((chunk) => parseInt(chunk, 16)));
    }
}
