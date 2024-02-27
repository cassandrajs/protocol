import { IllegalStateError } from "../../src/errors/IllegalStateError"
import { PrimitiveSizes } from "../../src/PrimitiveSizes"
import { HashObject } from "../../src/util/HashObject"
import { InetAddress } from "../../src/util/InetAddress"
import { InetSocketAddress } from "../../src/util/InetSocketAddress"
import { MockBinaryStringElementType } from "./MockBinaryStringElementType"

export class MockBinaryStringElement {
	static Type = {
		BYTE: 0,
		INT: 1,
		INET: 2,
		INETADDR: 3,
		LONG: 4,
		UNSIGNED_SHORT: 5,
		STRING: 6,
		LONG_STRING: 7,
		BYTES: 8,
		SHORT_BYTES: 9,
	}

	type: MockBinaryStringElementType
	value: any

	constructor(type: MockBinaryStringElementType, value: any) {
		this.type = type
		this.value = value
	}

	size(): number {
		let hexString: string
		switch (this.type) {
			case MockBinaryStringElement.Type.BYTE:
				return 1
			case MockBinaryStringElement.Type.INT:
				return PrimitiveSizes.INT
			case MockBinaryStringElement.Type.INET:
				return PrimitiveSizes.sizeOfInet(this.value as InetSocketAddress)
			case MockBinaryStringElement.Type.INETADDR:
				return PrimitiveSizes.sizeOfInetAddr(this.value as InetAddress)
			case MockBinaryStringElement.Type.LONG:
				return PrimitiveSizes.LONG
			case MockBinaryStringElement.Type.UNSIGNED_SHORT:
				return PrimitiveSizes.SHORT
			case MockBinaryStringElement.Type.STRING:
				return PrimitiveSizes.sizeOfString(this.value)
			case MockBinaryStringElement.Type.LONG_STRING:
				return PrimitiveSizes.sizeOfLongString(this.value)
			case MockBinaryStringElement.Type.BYTES:
				hexString = this.value as string // 0xabcdef
				return PrimitiveSizes.INT + (hexString.length - 2) / 2
			case MockBinaryStringElement.Type.SHORT_BYTES:
				hexString = this.value as string
				return PrimitiveSizes.SHORT + (hexString.length - 2) / 2
			default:
				throw new IllegalStateError("Unsupported element type " + this.type)
		}
	}

	equals(other: any): boolean {
		if (other instanceof MockBinaryStringElement) {
			return (
				this.type == other.type &&
				(this.value == null
					? other.value == null
					: this.value.equals(other.value))
			)
		}
		return false
	}

	hashCode(): number {
		return HashObject([this.type, this.value])
	}

	toString(): string {
		const typeName = Object.fromEntries(
			Object.entries(MockBinaryStringElement.Type).map((x) => [x[1], x[0]])
		)[this.type]
		return `${typeName}:${this.value}`
	}
}
