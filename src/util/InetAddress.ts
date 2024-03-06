import { Bytes } from "./Bytes"

export class InetAddress {
	buffer: Uint8Array
	length: number
	version: number

	constructor(buffer: Uint8Array) {
		if (
			!(buffer instanceof Uint8Array) ||
			(buffer.length !== 4 && buffer.length !== 16)
		) {
			throw new TypeError("The ip address must contain 4 or 16 bytes")
		}

		/**
		 * Immutable buffer that represents the IP address
		 * @type Array
		 */
		this.buffer = buffer

		/**
		 * Returns the length of the underlying buffer
		 * @type Number
		 */
		this.length = buffer.length

		/**
		 * Returns the Ip version (4 or 6)
		 * @type Number
		 */
		this.version = buffer.length === 4 ? 4 : 6
	}

	getAddress(): number[] {
		return []
	}

	static fromString(value: string) {
		if (!value) {
			return new InetAddress(new Uint8Array([0, 0, 0, 0]))
		}
		const ipv4Pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
		const ipv6Pattern = /^[\da-f:.]+$/i
		let parts
		if (ipv4Pattern.test(value)) {
			parts = value.split(".")
			return new InetAddress(new Uint8Array(parts))
		}
		if (!ipv6Pattern.test(value)) {
			throw new TypeError("Value could not be parsed as InetAddress: " + value)
		}
		parts = value.split(":")
		if (parts.length < 3) {
			throw new TypeError("Value could not be parsed as InetAddress: " + value)
		}
		const buffer = new Uint8Array(16)
		let filling = 8 - parts.length + 1
		let applied = false
		let offset = 0
		const embeddedIp4 = ipv4Pattern.test(parts[parts.length - 1])
		if (embeddedIp4) {
			// Its IPv6 address with an embedded IPv4 address:
			// subtract 1 from the potential empty filling as ip4 contains 4 bytes instead of 2 of a ipv6 section
			filling -= 1
		}
		function writeItem(uIntValue) {
			buffer[offset++] = +uIntValue
		}
		for (let i = 0; i < parts.length; i++) {
			const item = parts[i]
			if (item) {
				if (embeddedIp4 && i === parts.length - 1) {
					item.split(".").forEach(writeItem)
					break
				}
				Bytes.writeUInt16BE(buffer, parseInt(item, 16), offset)
				offset = offset + 2
				continue
			}
			//its an empty string
			if (applied) {
				//there could be 2 occurrences of empty string
				filling = 1
			}
			applied = true
			for (let j = 0; j < filling; j++) {
				buffer[offset++] = 0
				buffer[offset++] = 0
			}
		}
		if (embeddedIp4 && !InetAddress.isValidIPv4Mapped(buffer)) {
			throw new TypeError(
				"Only IPv4-Mapped IPv6 addresses are allowed as IPv6 address with embedded IPv4 address"
			)
		}
		return new InetAddress(buffer)
	}

	equals(other) {
		if (!(other instanceof InetAddress)) {
			return false
		}
		return (
			this.buffer.length === other.buffer.length &&
			Bytes.toHexString(this.buffer) === Bytes.toHexString(other.buffer)
		)
	}

	getBuffer() {
		return this.buffer
	}

	inspect() {
		return this.constructor.name + ": " + this.toString()
	}

	toString(encoding?: "hex") {
		if (encoding === "hex") {
			//backward compatibility: behave in the same way as the buffer
			return Bytes.toHexString(this.buffer)
		}
		if (this.buffer.length === 4) {
			return (
				this.buffer[0] +
				"." +
				this.buffer[1] +
				"." +
				this.buffer[2] +
				"." +
				this.buffer[3]
			)
		}
		let start = -1
		const longest = { length: 0, start: -1 }
		function checkLongest(i) {
			if (start >= 0) {
				//close the group
				const length = i - start
				if (length > longest.length) {
					longest.length = length
					longest.start = start
					start = -1
				}
			}
		}
		//get the longest 16-bit group of zeros
		for (let i = 0; i < this.buffer.length; i = i + 2) {
			if (this.buffer[i] === 0 && this.buffer[i + 1] === 0) {
				//its a group of zeros
				if (start < 0) {
					start = i
				}

				// at the end of the buffer, make a final call to checkLongest.
				if (i === this.buffer.length - 2) {
					checkLongest(i + 2)
				}
				continue
			}
			//its a group of non-zeros
			checkLongest(i)
		}

		let address = ""
		for (let h = 0; h < this.buffer.length; h = h + 2) {
			if (h === longest.start) {
				address += ":"
				continue
			}
			if (h < longest.start + longest.length && h > longest.start) {
				//its a group of zeros
				continue
			}
			if (address.length > 0) {
				address += ":"
			}
			address += ((this.buffer[h] << 8) | this.buffer[h + 1]).toString(16)
		}
		if (address.charAt(address.length - 1) === ":") {
			address += ":"
		}
		return address
	}

	toJSON() {
		return this.toString()
	}

	static isValidIPv4Mapped(buffer) {
		// check the form
		// |      80 bits   | 16 |   32 bits
		// +----------------+----+-------------
		// |0000........0000|FFFF| IPv4 address

		for (let i = 0; i < buffer.length - 6; i++) {
			if (buffer[i] !== 0) {
				return false
			}
		}
		return !(buffer[10] !== 255 || buffer[11] !== 255)
	}
}
