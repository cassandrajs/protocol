export declare class ByteString {
    private readonly bytes;
    private constructor();
    static readonly EMPTY: ByteString;
    static copyFrom(bytes: Uint8Array, offset?: number, size?: number): ByteString;
    byteAt(index: number): number;
    size(): number;
    isEmpty(): boolean;
    toByteArray(): Uint8Array;
    substring(beginIndex: number, endIndex?: number): ByteString;
    concat(other: ByteString): ByteString;
    copyTo(bytes: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): void;
    toStringUtf8(): string;
    static copyFromUtf8(text: string): ByteString;
    equals(other: ByteString): boolean;
    hashCode(): number;
}
