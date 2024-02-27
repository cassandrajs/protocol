import {
	Compressor,
	HashMap,
	IllegalArgumentError,
	IllegalStateError,
} from "../../src"
import { MockBinaryString } from "./MockBinaryString"

export class MockCompressor extends Compressor<MockBinaryString> {
	decompressedToCompressed: HashMap<MockBinaryString, MockBinaryString> =
		new HashMap()
	compressedToDecompressed: HashMap<MockBinaryString, MockBinaryString> =
		new HashMap()

	algorithm = "MOCK"

	compress(uncompressed) {
		const compressed = this.decompressedToCompressed.get(uncompressed)
		if (compressed == null) {
			throw new IllegalStateError(
				`Unknown uncompressed input ${uncompressed}, must be primed first`
			)
		}
		return compressed.copy()
	}

	decompress(compressed) {
		const decompressed = this.compressedToDecompressed.get(compressed)
		if (decompressed == null) {
			throw new IllegalStateError(
				`Unknown compressed input ${compressed}, must be primed first`
			)
		}
		return decompressed.copy()
	}

	compressWithoutLength(uncompressed) {
		return this.compress(uncompressed)
	}

	decompressWithoutLength(compressed, uncompressedLength) {
		const uncompressed = this.decompress(compressed)
		if (!(uncompressed.size() === uncompressedLength)) {
			throw new IllegalArgumentError(
				`uncompressedLength is not equal to the decompressed compressor size`
			)
		}
		return uncompressed
	}

	prime(
		decompressed: MockBinaryString,
		compressed: MockBinaryString
	): MockBinaryString | null {
		if (this.decompressedToCompressed.containsKey(decompressed)) {
			return this.decompressedToCompressed.get(decompressed)
		} else if (this.compressedToDecompressed.containsKey(compressed)) {
			throw new IllegalArgumentError(
				`${compressed} is already used as the compressed form of ${this.compressedToDecompressed.get(compressed)}`
			)
		} else {
			this.decompressedToCompressed.put(decompressed, compressed)
			this.compressedToDecompressed.put(compressed, decompressed)
			return compressed
		}
	}
}
