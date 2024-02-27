import { Character } from "./util/Character"
import { InetAddress } from "./util/InetAddress"
import { InetSocketAddress } from "./util/InetSocketAddress"

export class PrimitiveSizes {
	public static BYTE: number = 1
	public static SHORT: number = 2
	public static INT: number = 4
	public static LONG: number = 8
	public static UUID: number = 16

	static sizeOfString(str: string): number {
		return PrimitiveSizes.SHORT + this.encodedUTF8Length(str)
	}

	static sizeOfLongString(s: string) {
		return PrimitiveSizes.INT + this.encodedUTF8Length(s)
	}

	static sizeOfStringList(l: string[]): number {
		let size = PrimitiveSizes.SHORT
		for (let str of l) {
			size += this.sizeOfString(str)
		}
		return size
	}

	static sizeOfBytes(bytes: Uint8Array | number[]): number {
		return PrimitiveSizes.INT + (!bytes ? 0 : bytes.length)
	}

	static sizeOfShortBytes(bytes: Uint8Array | number[]): number {
		return PrimitiveSizes.SHORT + (!bytes ? 0 : bytes.length)
	}

	static sizeOfStringMap(m: { [key: string]: string }): number {
		let size = PrimitiveSizes.SHORT // length
		for (let entry of Object.entries(m)) {
			size += this.sizeOfString(entry[0])
			size += this.sizeOfString(entry[1])
		}
		return size
	}

	static sizeOfStringMultimap(m: { [key: string]: string[] }): number {
		let size = PrimitiveSizes.SHORT // length
		for (let entry of Object.entries(m)) {
			size += this.sizeOfString(entry[0])
			size += this.sizeOfStringList(entry[1])
		}
		return size
	}

	static sizeOfBytesMap(m: { [key: string]: Uint8Array }): number {
		let size = PrimitiveSizes.SHORT
		for (let entry of Object.entries(m)) {
			size += this.sizeOfString(entry[0])
			size += this.sizeOfBytes(entry[1])
		}
		return size
	}

	// Visible for testing
	static encodedUTF8Length(st: string): number {
		let length: number = 0
		for (let i = 0; i < st.length; i++) {
			const c = st.charCodeAt(i)
			if (Character.isHighSurrogate(c)) {
				if (i < st.length - 1) {
					const c1 = st.charCodeAt(i + 1)
					if (Character.isLowSurrogate(c1)) {
						// correct surrogate pair: 4 bytes
						length += 4
						i++
						continue
					}
				}
				// wrong high surrogate, not followed by a low surrogate
				length += 1
			} else if (Character.isLowSurrogate(c)) {
				// wrong low surrogate, not preceded by a high surrogate
				length += 1
			} else {
				if (c <= 0x7f) {
					length += 1
				} else if (c <= 0x7ff) {
					length += 2
				} else {
					length += 3
				}
			}
		}
		return length
	}

	static sizeOfInet(address: InetSocketAddress): number {
		return this.sizeOfInetAddr(address.getAddress()) + PrimitiveSizes.INT // port
	}

	static sizeOfInetAddr(address: InetAddress): number {
		const raw: number[] = address.getAddress()
		return (
			PrimitiveSizes.BYTE + // number of bytes in address
			raw.length
		) // bytes of address
	}
}
