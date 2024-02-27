import Long from "long"
import { IllegalStateError } from "../../src/errors/IllegalStateError"
import { UnsupportedOperationError } from "../../src/errors/UnsupportedOperationError"
import { Bytes } from "../../src/util/Bytes"
import { HashObject } from "../../src/util/HashObject"
import { InetAddress } from "../../src/util/InetAddress"
import { MockBinaryStringElement } from "./MockBinaryStringElement"
import { MockBinaryStringElementType } from "./MockBinaryStringElementType"

export class MockBinaryString {
	elements: MockBinaryStringElement[] = []
	mark: MockBinaryStringElement[]

	byte_(value: number): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.BYTE, value)
		return this
	}

	int_(value: number): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.INT, value)
		return this
	}

	inetAddr(host: InetAddress): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.INETADDR, host)
		return this
	}

	long_(value: Long): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.LONG, value)
		return this
	}

	unsignedShort(value: number): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.UNSIGNED_SHORT, value)
		return this
	}

	string(value: string): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.STRING, value)
		return this
	}

	longString(value: string): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.LONG_STRING, value)
		return this
	}

	bytes(value: string): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.BYTES, value)
		return this
	}

	shortBytes(value: string): MockBinaryString {
		this.appendElement(MockBinaryStringElement.Type.SHORT_BYTES, value)
		return this
	}

	append(other: MockBinaryString): MockBinaryString {
		for (const element of other.elements) {
			this.elements.push(element)
		}
		return this
	}

	markReaderIndex(): void {
		this.mark = []
		this.mark.push(...this.elements)
	}

	resetReaderIndex(): void {
		if (!this.mark) {
			throw new IllegalStateError("No mark, call markReaderIndex() first")
		}
		this.elements = this.mark
		this.mark = null
	}

	copy(): MockBinaryString {
		return new MockBinaryString().append(this)
	}

	size(): number {
		let size = 0
		for (const element of this.elements) {
			size += element.size()
		}
		return size
	}

	slice(targetSize: number): MockBinaryString {
		// We can't write a perfect implementation for this, since our internal representation is based
		// on primitive types (INT, LONG_STRING...), but not individual bytes.

		// The code below works as long as the split happens on the boundary between two elements. We
		// also support splitting a BYTES element, but that operation alters the contents
		// (re-concatenating the two strings is not strictly equal to the original).
		// This works for the tests that exercise this method so far, because they only check the
		// length, not the actual contents.

		const slice = new MockBinaryString()
		while (slice.size() < targetSize) {
			const element = this.pop()
			if (slice.size() + element.size() <= targetSize) {
				slice.appendElement(element.type, element.value)
			} else if (element.type == MockBinaryStringElement.Type.BYTES) {
				const hexString: string = element.value as string
				// BYTES starts with an int length
				const bytesToCopy = targetSize - slice.size() - 4
				// Hex strings starts with '0x' and each byte is two characters
				const split = 2 + bytesToCopy * 2
				slice.appendElement(
					MockBinaryStringElement.Type.BYTES,
					hexString.substring(0, split)
				)

				// Put the rest back in the source string. But we can't put it as a BYTES because size()
				// would over-estimate it by 4 (for the INT size). So write byte-by-byte instead.

				let remainingBytes = Bytes.fromHexString(hexString.substring(split))
				for (const b of remainingBytes) {
					this.appendElement(MockBinaryStringElement.Type.BYTE, b)
				}
			} else {
				throw new UnsupportedOperationError(
					"Can't split element other than BYTES"
				)
			}
		}
		return slice
	}

	pop(): MockBinaryStringElement {
		if (this.elements.length > 0) {
			return this.elements.splice(this.elements.length - 1, 1)[0]
		}
		throw new IllegalStateError("Stack is empty")
	}

	pollFirst(): MockBinaryStringElement {
		return this.elements.length > 0 ? this.elements.splice(0, 1)[0] : null
	}

	pollLast(): MockBinaryStringElement {
		return this.elements.length > 0
			? this.elements.splice(this.elements.length - 1, 1)[0]
			: null
	}

	private appendElement(type: MockBinaryStringElementType, value: any) {
		this.elements.push(new MockBinaryStringElement(type, value))
	}

	private prependElement(type: MockBinaryStringElementType, value: any) {
		this.elements = [new MockBinaryStringElement(type, value), ...this.elements]
	}

	equals(other: any): boolean {
		if (other instanceof MockBinaryString) {
			const that = other

			if (that.elements.length !== this.elements.length) return false

			for (var i = 0; i < this.elements.length; ++i) {
				if (this.elements[i] !== that.elements[i]) return false
			}
		}
		return false
	}

	public hashCode(): number {
		return HashObject(this.elements)
	}

	public toString(): string {
		return JSON.stringify(this.elements)
	}
}
