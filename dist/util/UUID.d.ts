import Long from "long";
export declare class UUID {
    private mostSigBits;
    private leastSigBits;
    constructor(mostSigBits: Long, leastSigBits: Long);
    static randomUUID(): UUID;
    static nameUUIDFromBytes(name: Uint8Array): UUID;
    static fromString(name: string): UUID;
    getLeastSignificantBits(): Long;
    getMostSignificantBits(): Long;
    version(): number;
    variant(): number;
    timestamp(): Long;
    clockSequence(): number;
    node(): Long;
    toString(): string;
    hashCode(): number;
    equals(obj: any): boolean;
    compareTo(val: UUID): number;
}
