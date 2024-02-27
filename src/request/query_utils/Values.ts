import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { ProtocolConstants } from "../../util/ProtocolConstants"

export class Values {
	public static writePositionalValues<B>(
		values: Array<Uint8Array>,
		dest: B,
		encoder: PrimitiveCodec<B>
	): void {
		encoder.writeUnsignedShort(values.length, dest)
		for (const value of values) {
			Values.writeValue(value, dest, encoder)
		}
	}

	public static sizeOfPositionalValues(values: Array<Uint8Array>): number {
		let size: number = PrimitiveSizes.SHORT
		for (const value of values) {
			size += Values.sizeOfValue(value)
		}
		return size
	}

	public static writeNamedValues<B>(
		values: { [key: string]: Uint8Array },
		dest: B,
		encoder: PrimitiveCodec<B>
	): void {
		encoder.writeUnsignedShort(Object.keys(values).length, dest)
		for (const [key, value] of Object.entries(values)) {
			encoder.writeString(key, dest)
			Values.writeValue(value, dest, encoder)
		}
	}

	public static sizeOfNamedValues(values: {
		[key: string]: Uint8Array
	}): number {
		let size: number = PrimitiveSizes.SHORT
		for (const [key, value] of Object.entries(values)) {
			size += PrimitiveSizes.sizeOfString(key)
			size += Values.sizeOfValue(value)
		}
		return size
	}

	private static writeValue<B>(
		value: Uint8Array | null | undefined,
		dest: B,
		encoder: PrimitiveCodec<B>
	): void {
		if (!value) {
			encoder.writeInt(-1, dest)
		} else if (value === ProtocolConstants.UNSET_VALUE) {
			encoder.writeInt(-2, dest)
		} else {
			encoder.writeBytes(value, dest)
		}
	}

	private static sizeOfValue(value: Uint8Array): number {
		return !value || value === ProtocolConstants.UNSET_VALUE
			? PrimitiveSizes.INT
			: PrimitiveSizes.sizeOfBytes(value)
	}

	public static readPositionalValues<B>(
		source: B,
		decoder: PrimitiveCodec<B>
	): Array<Uint8Array> {
		const size: number = decoder.readUnsignedShort(source)
		if (size === 0) {
			return []
		} else {
			const values: Array<Uint8Array> = []
			for (let i: number = 0; i < size; i++) {
				values.push(Values.readValue(source, decoder))
			}
			return values
		}
	}

	public static readNamedValues<B>(
		source: B,
		decoder: PrimitiveCodec<B>
	): { [key: string]: Uint8Array } {
		const size: number = decoder.readUnsignedShort(source)
		if (size === 0) {
			return {}
		} else {
			const values: { [key: string]: Uint8Array } = {}
			for (let i: number = 0; i < size; i++) {
				const key: string = decoder.readString(source)
				const value: Uint8Array = Values.readValue(source, decoder)
				values[key] = value
			}
			return values
		}
	}

	public static readValue<B>(
		source: B,
		decoder: PrimitiveCodec<B>
	): Uint8Array {
		return decoder.readBytes(source)
	}
}
