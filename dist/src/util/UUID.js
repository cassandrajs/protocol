import Long from "long";
export class UUID {
    mostSigBits;
    leastSigBits;
    constructor(mostSigBits, leastSigBits) {
        this.mostSigBits = mostSigBits;
        this.leastSigBits = leastSigBits;
    }
    //#region Static
    static randomUUID() {
        const randomValues = new Uint8Array(16);
        crypto.getRandomValues(randomValues);
        // Adjust version to be 4
        randomValues[6] = (randomValues[6] & 0x0f) | 0x40; // Version 4
        // Adjust variant to be 1
        randomValues[8] = (randomValues[8] & 0x3f) | 0x80; // Variant 1
        const msb = new Long((randomValues[0] << 24) |
            (randomValues[1] << 16) |
            (randomValues[2] << 8) |
            randomValues[3], (randomValues[4] << 24) |
            (randomValues[5] << 16) |
            (randomValues[6] << 8) |
            randomValues[7], true);
        const lsb = new Long((randomValues[8] << 24) |
            (randomValues[9] << 16) |
            (randomValues[10] << 8) |
            randomValues[11], (randomValues[12] << 24) |
            (randomValues[13] << 16) |
            (randomValues[14] << 8) |
            randomValues[15], true);
        return new UUID(msb, lsb);
    }
    static nameUUIDFromBytes(name) {
        throw new Error("Not implemented");
    }
    static fromString(name) {
        throw new Error("Not implemented");
    }
    //#endregion
    getLeastSignificantBits() {
        return this.leastSigBits;
    }
    getMostSignificantBits() {
        return this.mostSigBits;
    }
    version() {
        // Version is part of the most significant bits, stored in bits 12 through 15
        return this.mostSigBits.shiftRight(12).toInt() & 0x0f;
    }
    variant() {
        // Variant is stored in the two most significant bits of the clock_seq field.
        return this.leastSigBits.shiftRight(62).toInt() & 0x03;
    }
    timestamp() {
        throw new Error("Not implemented");
    }
    clockSequence() {
        throw new Error("Not implemented");
    }
    node() {
        throw new Error("Not implemented");
    }
    toString() {
        const convertPart = (value, startIndex, endIndex) => {
            let hexStr = value.toString(16).padStart(16, "0"); // Pad to ensure we have leading zeros
            hexStr = hexStr.substring(startIndex, endIndex);
            return hexStr;
        };
        return (convertPart(this.mostSigBits, 0, 8) +
            "-" +
            convertPart(this.mostSigBits, 8, 12) +
            "-" +
            convertPart(this.mostSigBits, 12, 16) +
            "-" +
            convertPart(this.leastSigBits, 0, 4) +
            "-" +
            convertPart(this.leastSigBits, 4, 16));
    }
    hashCode() {
        // Simple hash code function, combining both parts
        return this.mostSigBits.xor(this.leastSigBits).toInt();
    }
    equals(obj) {
        if (!(obj instanceof UUID))
            return false;
        return (this.mostSigBits.equals(obj.getMostSignificantBits()) &&
            this.leastSigBits.equals(obj.getLeastSignificantBits()));
    }
    compareTo(val) {
        // Compare most significant bits first
        let cmp = this.mostSigBits.compare(val.getMostSignificantBits());
        if (cmp !== 0)
            return cmp;
        // If equal, compare least significant bits
        return this.leastSigBits.compare(val.getLeastSignificantBits());
    }
}
