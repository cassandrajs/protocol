import { Compressor } from "./Compressor";
export declare class NoopCompressor<B> extends Compressor<B> {
    algorithm: string;
    compress(uncompressed: B): B;
    decompress(compressed: B): B;
    compressWithoutLength(compressed: B): B;
    decompressWithoutLength(compressed: B): B;
}
