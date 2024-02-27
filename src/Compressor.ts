import { NoopCompressor } from "./NoopCompressor"

export class Compressor<B> {
	static none<B>(): Compressor<B> {
		return new NoopCompressor<B>()
	}

	algorithm: string

	compress(uncompressed: B): B {
		throw new Error("")
	}

	decompress(compressed: B): B {
		throw new Error("")
	}

	compressWithoutLength(uncompressed: B): B {
		throw new Error("")
	}

	decompressWithoutLength(compressed: B, uncompressedLength: number): B {
		throw new Error("")
	}
}
