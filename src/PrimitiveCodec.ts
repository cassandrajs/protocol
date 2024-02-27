import Long from "long"
import { InetAddress } from "./util/InetAddress"
import { InetSocketAddress } from "./util/InetSocketAddress"
import { UUID } from "./util/UUID"

export abstract class PrimitiveCodec<B> {
	abstract allocate(size: number): B
	abstract release(toRelease: B): void

	abstract sizeOf(toMeasure: B): number

	abstract concat(left: B, right: B): B

	abstract markReaderIndex(source: B): void

	abstract resetReaderIndex(source: B): void

	abstract readByte(source: B): number

	abstract readInt(source: B, offset?: number): number

	abstract readInetAddr(source: B): InetAddress

	abstract readLong(source: B): Long

	abstract readUnsignedShort(source: B): number

	abstract readBytes(source: B): Uint8Array

	abstract readShortBytes(source: B): number[]

	abstract readString(source: B): string

	abstract readLongString(source: B): string

	abstract readRetainedSlice(source: B, sliceLength: number): B

	abstract updateCrc(source: B, crc: any): void

	readUuid(source: B) {
		const msb: Long = this.readLong(source)
		const lsb: Long = this.readLong(source)
		return new UUID(msb, lsb)
	}

	readStringList(source: B): string[] {
		const size: number = this.readUnsignedShort(source)

		if (size == 0) return []

		const result = []
		for (let i = 0; i < size; i++) {
			result.push(this.readString(source))
		}
		return result
	}

	readStringMap(source: B): { [key: string]: string } {
		const size: number = this.readUnsignedShort(source)

		if (size == 0) return {}

		const result: { [key: string]: string } = {}
		for (let i = 0; i < size; i++) {
			result[this.readString(source)] = this.readString(source)
		}
		return result
	}

	readStringMultimap(source: B): { [key: string]: string[] } {
		const size: number = this.readUnsignedShort(source)

		if (size == 0) return {}

		const result: { [key: string]: string[] } = {}
		for (let i = 0; i < size; i++) {
			result[this.readString(source)] = this.readStringList(source)
		}
		return result
	}

	readBytesMap(source: B): { [key: string]: Uint8Array } {
		const size: number = this.readUnsignedShort(source)

		if (size == 0) return {}

		const result: { [key: string]: Uint8Array } = {}
		for (let i = 0; i < size; i++) {
			result[this.readString(source)] = this.readBytes(source)
		}
		return result
	}

	readInet(source: B): InetSocketAddress {
		return new InetSocketAddress(
			this.readInetAddr(source),
			this.readInt(source)
		)
	}

	abstract writeByte(b: number, dest: B): void

	abstract writeInt(i: number, dest: B): void

	abstract writeInetAddr(address: InetAddress, dest: B): void

	abstract writeLong(l: Long, dest: B): void

	abstract writeUnsignedShort(i: number, dest: B): void

	abstract writeString(s: string, dest: B): void

	abstract writeLongString(s: string, dest: B): void

	writeUuid(uuid: UUID, dest: B): void {
		this.writeLong(uuid.getMostSignificantBits(), dest)
		this.writeLong(uuid.getLeastSignificantBits(), dest)
	}

	abstract writeBytes(bytes: Uint8Array, dest: B): void

	abstract writeShortBytes(bytes: number[], dest: B): void

	writeStringList(l: string[], dest: B) {
		this.writeUnsignedShort(l.length, dest)
		for (let s of l) {
			this.writeString(s, dest)
		}
	}

	writeStringMap(m: { [key: string]: string }, dest: B) {
		const entries = Object.entries(m)
		this.writeUnsignedShort(entries.length, dest)
		for (let s of entries) {
			this.writeString(s[0], dest)
			this.writeString(s[1], dest)
		}
	}

	writeStringMultimap(m: { [key: string]: string[] }, dest: B) {
		const entries = Object.entries(m)
		this.writeUnsignedShort(entries.length, dest)
		for (let s of entries) {
			this.writeString(s[0], dest)
			this.writeStringList(s[1], dest)
		}
	}

	writeBytesMap(m: { [key: string]: Uint8Array }, dest: B) {
		const entries = Object.entries(m)
		this.writeUnsignedShort(entries.length, dest)
		for (let s of entries) {
			this.writeString(s[0], dest)
			this.writeBytes(s[1], dest)
		}
	}

	writeInet(address: InetSocketAddress, dest: B) {
		this.writeInetAddr(address.getAddress(), dest)
		this.writeInt(address.getPort(), dest)
	}
}
