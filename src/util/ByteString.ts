export class ByteString {
	private readonly bytes: Uint8Array

	private constructor(bytes: Uint8Array) {
		this.bytes = bytes
	}

	static readonly EMPTY = new ByteString(new Uint8Array(0))

	static copyFrom(bytes: Uint8Array, offset = 0, size?: number): ByteString {
		if (size === undefined) {
			size = bytes.length
		}
		const slice = new Uint8Array(bytes.slice(offset, offset + size))
		return new ByteString(slice)
	}

	byteAt(index: number): number {
		return this.bytes[index]
	}

	size(): number {
		return this.bytes.length
	}

	isEmpty(): boolean {
		return this.size() === 0
	}

	toByteArray(): Uint8Array {
		return this.bytes.slice()
	}

	substring(beginIndex: number, endIndex?: number): ByteString {
		return new ByteString(this.bytes.slice(beginIndex, endIndex))
	}

	concat(other: ByteString): ByteString {
		const concatenated = new Uint8Array(this.size() + other.size())
		concatenated.set(this.bytes, 0)
		concatenated.set(other.bytes, this.size())
		return new ByteString(concatenated)
	}

	copyTo(
		bytes: Uint8Array,
		targetStart: number = 0,
		sourceStart: number = 0,
		sourceEnd?: number
	): void {
		const slice = this.bytes.slice(sourceStart, sourceEnd)
		bytes.set(slice, targetStart)
	}

	toStringUtf8(): string {
		return new TextDecoder("utf-8").decode(this.bytes)
	}

	static copyFromUtf8(text: string): ByteString {
		const encoder = new TextEncoder()
		return new ByteString(encoder.encode(text))
	}

	equals(other: ByteString): boolean {
		if (this.size() !== other.size()) {
			return false
		}
		for (let i = 0; i < this.size(); i++) {
			if (this.byteAt(i) !== other.byteAt(i)) {
				return false
			}
		}
		return true
	}

	hashCode(): number {
		let hash = 0
		for (const byte of this.bytes) {
			hash = (hash * 31 + byte) | 0 // Force overflow to 32-bit int
		}
		return hash
	}

	// Additional utility methods can be implemented as needed.
}
