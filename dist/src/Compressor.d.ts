export declare class Compressor<B> {
    static none<B>(): Compressor<B>;
    algorithm: string;
    compress(uncompressed: B): B;
    decompress(compressed: B): B;
    compressWithoutLength(uncompressed: B): B;
    decompressWithoutLength(compressed: B, uncompressedLength: number): B;
}
