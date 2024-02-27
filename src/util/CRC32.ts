import Long from "long"
import { IllegalArgumentError } from "../errors/IllegalArgumentError"

export class CRC32 {
	private crc: Long = new Long(0)

	constructor() {
		this.reset()
	}

	public reset(): void {
		this.crc = Long.fromInt(0xffffffff)
	}

	public update(b: number[] | Uint8Array, off?: number, len?: number): void {
		if (typeof b === "undefined") {
			throw new IllegalArgumentError("Argument b is required")
		}

		let start = off || 0
		let end = len != null ? start + len : b.length

		for (let i = start; i < end; i++) {
			this.crc = this.crc.xor(Long.fromInt(b[i] & 0xff))
			for (let j = 0; j < 8; j++) {
				if (this.crc.and(1).eq(1)) {
					this.crc = this.crc.shr(1).xor(new Long(0xedb88320))
				} else {
					this.crc = this.crc.shr(1)
				}
			}
		}
	}

	public getValue(): Long {
		return this.crc.not()
	}
}
