export declare class Bytes {
    static toHexString(bytes: Uint8Array | number[]): string;
    static fromHexString(hexString: string): Uint8Array;
    static readInt32BE(buf: Uint8Array, offset: number): number;
    static readUInt32BE(buf: Uint8Array, offset: number): number;
    static writeInt16BE(buf: Uint8Array, value: number, offset: number): void;
    static writeInt32BE(buf: Uint8Array, value: number, offset: number): void;
    static writeUInt16BE(buf: Uint8Array, value: number, offset: number): void;
    static writeUInt32BE(buf: Uint8Array, value: number, offset: number): void;
}
