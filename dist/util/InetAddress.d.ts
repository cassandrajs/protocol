export declare class InetAddress {
    buffer: Uint8Array;
    length: number;
    version: number;
    constructor(buffer: Uint8Array);
    getAddress(): number[];
    static fromString(value: string): InetAddress;
    equals(other: any): boolean;
    getBuffer(): Uint8Array;
    inspect(): string;
    toString(encoding?: "hex"): string;
    toJSON(): string;
    static isValidIPv4Mapped(buffer: any): boolean;
}
