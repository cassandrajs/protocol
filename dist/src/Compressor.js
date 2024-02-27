import { NoopCompressor } from "./NoopCompressor";
export class Compressor {
    static none() {
        return new NoopCompressor();
    }
    algorithm;
    compress(uncompressed) {
        throw new Error("");
    }
    decompress(compressed) {
        throw new Error("");
    }
    compressWithoutLength(uncompressed) {
        throw new Error("");
    }
    decompressWithoutLength(compressed, uncompressedLength) {
        throw new Error("");
    }
}
