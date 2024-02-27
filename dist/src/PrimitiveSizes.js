import { Character } from "./util/Character";
export class PrimitiveSizes {
    static BYTE = 1;
    static SHORT = 2;
    static INT = 4;
    static LONG = 8;
    static UUID = 16;
    static sizeOfString(str) {
        return PrimitiveSizes.SHORT + this.encodedUTF8Length(str);
    }
    static sizeOfLongString(s) {
        return PrimitiveSizes.INT + this.encodedUTF8Length(s);
    }
    static sizeOfStringList(l) {
        let size = PrimitiveSizes.SHORT;
        for (let str of l) {
            size += this.sizeOfString(str);
        }
        return size;
    }
    static sizeOfBytes(bytes) {
        return PrimitiveSizes.INT + (!bytes ? 0 : bytes.length);
    }
    static sizeOfShortBytes(bytes) {
        return PrimitiveSizes.SHORT + (!bytes ? 0 : bytes.length);
    }
    static sizeOfStringMap(m) {
        let size = PrimitiveSizes.SHORT; // length
        for (let entry of Object.entries(m)) {
            size += this.sizeOfString(entry[0]);
            size += this.sizeOfString(entry[1]);
        }
        return size;
    }
    static sizeOfStringMultimap(m) {
        let size = PrimitiveSizes.SHORT; // length
        for (let entry of Object.entries(m)) {
            size += this.sizeOfString(entry[0]);
            size += this.sizeOfStringList(entry[1]);
        }
        return size;
    }
    static sizeOfBytesMap(m) {
        let size = PrimitiveSizes.SHORT;
        for (let entry of Object.entries(m)) {
            size += this.sizeOfString(entry[0]);
            size += this.sizeOfBytes(entry[1]);
        }
        return size;
    }
    // Visible for testing
    static encodedUTF8Length(st) {
        let length = 0;
        for (let i = 0; i < st.length; i++) {
            const c = st.charCodeAt(i);
            if (Character.isHighSurrogate(c)) {
                if (i < st.length - 1) {
                    const c1 = st.charCodeAt(i + 1);
                    if (Character.isLowSurrogate(c1)) {
                        // correct surrogate pair: 4 bytes
                        length += 4;
                        i++;
                        continue;
                    }
                }
                // wrong high surrogate, not followed by a low surrogate
                length += 1;
            }
            else if (Character.isLowSurrogate(c)) {
                // wrong low surrogate, not preceded by a high surrogate
                length += 1;
            }
            else {
                if (c <= 0x7f) {
                    length += 1;
                }
                else if (c <= 0x7ff) {
                    length += 2;
                }
                else {
                    length += 3;
                }
            }
        }
        return length;
    }
    static sizeOfInet(address) {
        return this.sizeOfInetAddr(address.getAddress()) + PrimitiveSizes.INT; // port
    }
    static sizeOfInetAddr(address) {
        const raw = address.getAddress();
        return (PrimitiveSizes.BYTE + // number of bytes in address
            raw.length); // bytes of address
    }
}
