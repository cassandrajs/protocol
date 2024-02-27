import Long from "long"
import { IllegalArgumentError } from "../../src/errors/IllegalArgumentError"
import { PrimitiveCodec } from "../../src/PrimitiveCodec"
import { Bytes } from "../../src/util/Bytes"
import { InetAddress } from "../../src/util/InetAddress"
import { MockBinaryString } from "./MockBinaryString"
import { MockBinaryStringElement } from "./MockBinaryStringElement"
import { MockBinaryStringElementType } from "./MockBinaryStringElementType"

export class MockPrimitiveCodec extends PrimitiveCodec<MockBinaryString> {
	static INSTANCE: MockPrimitiveCodec = new MockPrimitiveCodec()

	allocate = (size: number): MockBinaryString => new MockBinaryString()

	release = (toRelease: MockBinaryString): void => {}

	sizeOf = (toMeasure: MockBinaryString): number => toMeasure.size()

	resetReaderIndex = (source: MockBinaryString): void =>
		source.resetReaderIndex()

	markReaderIndex = (source: MockBinaryString): void => source.markReaderIndex()

	concat = (
		left: MockBinaryString,
		right: MockBinaryString
	): MockBinaryString => left.append(right)

	readByte = (source: MockBinaryString): number =>
		this.pop(source, MockBinaryStringElement.Type.BYTE)

	readInt(source: MockBinaryString, offset?: number): number {
		if (!offset) return this.pop(source, MockBinaryStringElement.Type.INT)

		const copy = source.copy()
		let skipped = 0
		while (skipped < offset) {
			const element = copy.pop()
			skipped += element.size()
		}
		if (skipped != offset) {
			throw new IllegalArgumentError(
				"Offset must match an exact number of elements"
			)
		}
		return this.readInt(copy)
	}

	readInetAddr = (source: MockBinaryString): InetAddress =>
		this.pop(source, MockBinaryStringElement.Type.INETADDR)

	readLong = (source: MockBinaryString): Long =>
		this.pop(source, MockBinaryStringElement.Type.LONG)

	readUnsignedShort = (source: MockBinaryString): number =>
		this.pop(source, MockBinaryStringElement.Type.UNSIGNED_SHORT)

	readBytes = (source: MockBinaryString): Uint8Array =>
		Bytes.fromHexString(this.pop(source, MockBinaryStringElement.Type.BYTES))

	readShortBytes = (source: MockBinaryString): number[] => [
		...Bytes.fromHexString(
			this.pop(source, MockBinaryStringElement.Type.SHORT_BYTES)
		),
	]

	readString = (source: MockBinaryString): string =>
		this.pop(source, MockBinaryStringElement.Type.STRING)

	readLongString = (source: MockBinaryString): string =>
		this.pop(source, MockBinaryStringElement.Type.LONG_STRING)

	readRetainedSlice = (
		source: MockBinaryString,
		sliceLength: number
	): MockBinaryString => source.slice(sliceLength)

	updateCrc(source: MockBinaryString, crc: any): void {
		const source2 = source.copy() // don't consume the input
		let element: MockBinaryStringElement
		while ((element = source2.pollFirst()) != null) {
			if (element.type == MockBinaryStringElement.Type.BYTE) {
				crc.update((element.value as number) & 0xff)
			} else {
				throw new IllegalArgumentError(
					"PrimitiveCodec.updateCrc() is only supported on MockBinaryStrings that were assembled byte-by-byte. " +
						"Unexpected type " +
						element.type
				)
			}
		}
	}

	writeByte(b: number, dest: MockBinaryString): void {
		dest.byte_(b)
	}

	writeInt(i: number, dest: MockBinaryString): void {
		dest.int_(i)
	}

	writeInetAddr(address: InetAddress, dest: MockBinaryString): void {
		dest.inetAddr(address)
	}

	writeLong(l: Long, dest: MockBinaryString): void {
		dest.long_(l)
	}

	writeUnsignedShort(i: number, dest: MockBinaryString): void {
		dest.unsignedShort(i)
	}

	writeString(s: string, dest: MockBinaryString): void {
		dest.string(s)
	}

	writeLongString(s: string, dest: MockBinaryString): void {
		dest.longString(s)
	}

	writeBytes(bytes: Uint8Array | number[], dest: MockBinaryString): void {
		dest.bytes(!bytes ? "0x" : Bytes.toHexString(bytes))
	}

	writeShortBytes(bytes: number[], dest: MockBinaryString): void {
		dest.shortBytes(Bytes.toHexString(bytes))
	}

	private pop(
		source: MockBinaryString,
		expectedType: MockBinaryStringElementType
	): any {
		const element: MockBinaryStringElement = source.pop()
		if (!(element.type === expectedType)) {
			throw new IllegalArgumentError(
				`source element type does not match expectedType`
			)
		}
		return element.value
	}
}
