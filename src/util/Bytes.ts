export class Bytes {
	static toHexString(bytes: Uint8Array | number[]): string {
		return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("")
	}

	static fromHexString(hexString: string): Uint8Array {
		const chunks = hexString.match(/.{1,2}/g) || []
		return new Uint8Array(chunks.map((chunk) => parseInt(chunk, 16)))
	}
}
