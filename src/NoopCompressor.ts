import { Compressor } from "./Compressor"

export class NoopCompressor<B> extends Compressor<B> {
	algorithm: string = "none"

	compress(uncompressed: B): B {
		return uncompressed
	}

	decompress(compressed: B): B {
		return compressed
	}

	compressWithoutLength(compressed: B): B {
		return compressed
	}

	decompressWithoutLength(compressed: B): B {
		return compressed
	}
}
