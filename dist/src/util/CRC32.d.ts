import Long from "long";
export declare class CRC32 {
    private crc;
    constructor();
    reset(): void;
    update(b: number[] | Uint8Array, off?: number, len?: number): void;
    getValue(): Long;
}
