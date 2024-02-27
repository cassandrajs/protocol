import { Compressor } from "./Compressor";
export class NoopCompressor extends Compressor {
    algorithm = "none";
    compress(uncompressed) {
        return uncompressed;
    }
    decompress(compressed) {
        return compressed;
    }
    compressWithoutLength(compressed) {
        return compressed;
    }
    decompressWithoutLength(compressed) {
        return compressed;
    }
}
