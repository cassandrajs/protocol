import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { HashMap } from "../../util/HashMap"
import { HashObject } from "../../util/HashObject"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"

export class ARawType {
	id: number // DataType ID

	protected constructor(id: number) {
		this.id = id
	}

	static decode<B>(
		source: B,
		decoder: PrimitiveCodec<B>,
		protocolVersion: number
	): RawType {
		throw new Error("Not implemented")
	}

	encode<B>(
		dest: B,
		encoder: PrimitiveCodec<B>,
		protocolVersion: number
	): void {
		throw new Error("Not implemented")
	}

	encodedSize(protocolVersion: number): number {
		throw new Error("Not implemented")
	}

	equals(other: RawType): boolean {
		if (this === other) {
			return true
		}
		return this.id === other.id
	}

	hashCode(): number {
		return this.id
	}
}

class TheRawPrimitive extends ARawType {
	constructor(id: number) {
		super(id)
	}

	encode<B>(
		dest: B,
		encoder: PrimitiveCodec<B>,
		protocolVersion: number
	): void {
		encoder.writeUnsignedShort(this.id, dest)
	}

	encodedSize(protocolVersion: number): number {
		return PrimitiveSizes.SHORT
	}
}

const PRIMITIVES = new HashMap<number, RawType>(
	[
		ProtocolConstants.DataType.ASCII,
		ProtocolConstants.DataType.BIGINT,
		ProtocolConstants.DataType.BLOB,
		ProtocolConstants.DataType.BOOLEAN,
		ProtocolConstants.DataType.COUNTER,
		ProtocolConstants.DataType.DECIMAL,
		ProtocolConstants.DataType.DOUBLE,
		ProtocolConstants.DataType.FLOAT,
		ProtocolConstants.DataType.INET,
		ProtocolConstants.DataType.INT,
		ProtocolConstants.DataType.TIMESTAMP,
		ProtocolConstants.DataType.UUID,
		ProtocolConstants.DataType.VARCHAR,
		ProtocolConstants.DataType.VARINT,
		ProtocolConstants.DataType.TIMEUUID,
		ProtocolConstants.DataType.SMALLINT,
		ProtocolConstants.DataType.TINYINT,
		ProtocolConstants.DataType.DURATION,
		ProtocolConstants.DataType.DATE,
		ProtocolConstants.DataType.TIME,
	].map((id) => {
		return [id, new TheRawPrimitive(id)]
	})
)

export class RawType extends ARawType {
	static decode<B>(
		source: B,
		decoder: PrimitiveCodec<B>,
		protocolVersion: number
	): RawType {
		const id: number = decoder.readUnsignedShort(source)
		switch (id) {
			case ProtocolConstants.DataType.CUSTOM:
				const className: string = decoder.readString(source)
				return new RawType.RawCustom(className)
			case ProtocolConstants.DataType.LIST:
				return new RawType.RawList(
					this.decode(source, decoder, protocolVersion)
				)
			case ProtocolConstants.DataType.SET:
				return new RawType.RawSet(this.decode(source, decoder, protocolVersion))
			case ProtocolConstants.DataType.MAP:
				const key: RawType = this.decode(source, decoder, protocolVersion)
				const value: RawType = this.decode(source, decoder, protocolVersion)
				return new RawType.RawMap(key, value)
			case ProtocolConstants.DataType.UDT:
				const keyspace: string = decoder.readString(source)
				const typeName: string = decoder.readString(source)
				let fieldCount: number = decoder.readUnsignedShort(source)
				let fields: { [key: string]: RawType } = {}
				for (let i = 0; i < fieldCount; i++) {
					const fieldName: string = decoder.readString(source)
					const fieldType: RawType = this.decode(
						source,
						decoder,
						protocolVersion
					)
					fields[fieldName] = fieldType
				}
				return new RawType.RawUdt(keyspace, typeName, fields)
			case ProtocolConstants.DataType.TUPLE:
				fieldCount = decoder.readUnsignedShort(source)
				let fieldTypes: RawType[] = []
				for (let i = 0; i < fieldCount; i++) {
					fieldTypes.push(this.decode(source, decoder, protocolVersion))
				}
				return new RawType.RawTuple(fieldTypes)
			default:
				const type: RawType | undefined = PRIMITIVES.get(id)
				if (type === undefined) {
					throw new Error(`Unknown type id: ${id}`)
				}
				return type
		}
	}

	encode<B>(
		dest: B,
		encoder: PrimitiveCodec<B>,
		protocolVersion: number
	): void {
		throw new Error("Method not implemented.")
	}

	encodedSize(protocolVersion: number): number {
		throw new Error("Method not implemented.")
	}

	static RawPrimitive = TheRawPrimitive

	static RawCustom = class extends RawType {
		className: string

		constructor(className: string) {
			super(ProtocolConstants.DataType.CUSTOM)
			this.className = className
		}

		encode<B>(
			dest: B,
			encoder: PrimitiveCodec<B>,
			protocolVersion: number
		): void {
			encoder.writeUnsignedShort(this.id, dest)
			encoder.writeString(this.className, dest)
		}

		encodedSize(protocolVersion: number): number {
			return PrimitiveSizes.SHORT + PrimitiveSizes.sizeOfString(this.className)
		}

		equals(o: any): boolean {
			if (this === o) {
				return true
			}
			if (!o || !(o instanceof RawType.RawCustom)) {
				return false
			}
			if (!super.equals(o)) {
				return false
			}

			return this.className === o.className
		}

		hashCode(): number {
			let result = super.hashCode()
			result = 31 * result + (this.className ? HashObject(this.className) : 0)
			return result
		}
	}

	static RawList = class extends RawType {
		elementType: RawType

		constructor(elementType: RawType) {
			super(ProtocolConstants.DataType.LIST)
			this.elementType = elementType
		}

		encode<B>(
			dest: B,
			encoder: PrimitiveCodec<B>,
			protocolVersion: number
		): void {
			encoder.writeUnsignedShort(this.id, dest)
			this.elementType.encode(dest, encoder, protocolVersion)
		}

		encodedSize(protocolVersion: number): number {
			return (
				PrimitiveSizes.SHORT + this.elementType.encodedSize(protocolVersion)
			)
		}

		equals(o: any): boolean {
			if (this === o) {
				return true
			}
			if (o === null || this.constructor !== o.constructor) {
				return false
			}
			if (!super.equals(o)) {
				return false
			}

			const rawList = o as this

			return this.elementType.equals(rawList.elementType)
		}

		hashCode(): number {
			let result = super.hashCode()
			result = 31 * result + this.elementType.hashCode()
			return result
		}
	}

	static RawSet = class extends RawType {
		elementType: RawType

		constructor(elementType: RawType) {
			super(ProtocolConstants.DataType.SET)
			this.elementType = elementType
		}

		encode<B>(
			dest: B,
			encoder: PrimitiveCodec<B>,
			protocolVersion: ProtocolVersion
		): void {
			encoder.writeUnsignedShort(this.id, dest)
			this.elementType.encode(dest, encoder, protocolVersion)
		}

		encodedSize(protocolVersion: ProtocolVersion): number {
			return (
				PrimitiveSizes.SHORT + this.elementType.encodedSize(protocolVersion)
			)
		}

		equals(o: any): boolean {
			if (this === o) return true
			if (!o || this.constructor !== o.constructor) return false
			if (!super.equals(o)) return false

			const other = o as this
			return this.elementType.equals(other.elementType)
		}

		hashCode(): number {
			let result = super.hashCode()
			result = 31 * result + this.elementType.hashCode()
			return result
		}
	}

	static RawMap = class extends RawType {
		keyType: RawType
		valueType: RawType

		constructor(keyType: RawType, valueType: RawType) {
			super(ProtocolConstants.DataType.MAP)
			this.keyType = keyType
			this.valueType = valueType
		}

		encode<B>(
			dest: B,
			encoder: PrimitiveCodec<B>,
			protocolVersion: number
		): void {
			encoder.writeUnsignedShort(this.id, dest)
			this.keyType.encode(dest, encoder, protocolVersion)
			this.valueType.encode(dest, encoder, protocolVersion)
		}

		encodedSize(protocolVersion: number): number {
			return (
				PrimitiveSizes.SHORT +
				this.keyType.encodedSize(protocolVersion) +
				this.valueType.encodedSize(protocolVersion)
			)
		}

		equals(o: any): boolean {
			if (this === o) {
				return true
			}
			if (!(o instanceof RawType.RawMap)) {
				return false
			}
			if (!super.equals(o)) {
				return false
			}

			let rawMap = o as this
			return (
				this.keyType.equals(rawMap.keyType) &&
				this.valueType.equals(rawMap.valueType)
			)
		}

		hashCode(): number {
			let result: number = super.hashCode()
			result = 31 * result + this.keyType.hashCode()
			result = 31 * result + this.valueType.hashCode()
			return result
		}
	}

	static RawUdt = class extends RawType {
		keyspace: string
		typeName: string
		fields: { [key: string]: RawType }

		constructor(
			keyspace: string,
			typeName: string,
			fields: { [key: string]: RawType }
		) {
			super(ProtocolConstants.DataType.UDT)
			this.keyspace = keyspace
			this.typeName = typeName
			this.fields = fields
		}

		encode<B>(
			dest: B,
			encoder: PrimitiveCodec<B>,
			protocolVersion: ProtocolVersion
		): void {
			encoder.writeUnsignedShort(this.id, dest)
			encoder.writeString(this.keyspace, dest)
			encoder.writeString(this.typeName, dest)
			encoder.writeUnsignedShort(Object.keys(this.fields).length, dest)
			Object.entries(this.fields).forEach(([key, value]) => {
				encoder.writeString(key, dest)
				value.encode(dest, encoder, protocolVersion)
			})
		}

		encodedSize(protocolVersion: ProtocolVersion): number {
			let size =
				PrimitiveSizes.SHORT +
				PrimitiveSizes.sizeOfString(this.keyspace) +
				PrimitiveSizes.sizeOfString(this.typeName) +
				PrimitiveSizes.SHORT
			Object.entries(this.fields).forEach(([key, value]) => {
				size += PrimitiveSizes.sizeOfString(key)
				size += value.encodedSize(protocolVersion)
			})
			return size
		}

		equals(o: any): boolean {
			if (this === o) {
				return true
			}
			if (!o || this.constructor !== o.constructor) {
				return false
			}
			if (!super.equals(o)) {
				return false
			}

			const other = o as this
			return (
				this.keyspace === other.keyspace &&
				this.typeName === other.typeName &&
				this.fieldsEqual(other.fields)
			)
		}

		fieldsEqual(otherFields: { [key: string]: RawType }): boolean {
			const thisFieldKeys = Object.keys(this.fields)
			const otherFieldKeys = Object.keys(otherFields)
			if (thisFieldKeys.length !== otherFieldKeys.length) {
				return false
			}
			for (const key of thisFieldKeys) {
				if (!this.fields[key].equals(otherFields[key])) {
					return false
				}
			}
			return true
		}

		hashCode(): number {
			let result = super.hashCode()
			result = 31 * result + HashObject(this.keyspace)
			result = 31 * result + HashObject(this.typeName)
			result =
				31 * result +
				Object.values(this.fields).reduce(
					(acc, rawType) => acc + rawType.hashCode(),
					0
				)
			return result
		}
	}

	static RawTuple = class extends RawType {
		fieldTypes: RawType[]

		constructor(fieldTypes: RawType[]) {
			super(ProtocolConstants.DataType.TUPLE)
			this.fieldTypes = fieldTypes
		}

		encode<B>(
			dest: B,
			encoder: PrimitiveCodec<B>,
			protocolVersion: ProtocolVersion
		): void {
			encoder.writeUnsignedShort(this.id, dest)
			encoder.writeUnsignedShort(this.fieldTypes.length, dest)
			this.fieldTypes.forEach((fieldType) => {
				fieldType.encode(dest, encoder, protocolVersion)
			})
		}

		encodedSize(protocolVersion: ProtocolVersion): number {
			let size = PrimitiveSizes.SHORT + PrimitiveSizes.SHORT
			this.fieldTypes.forEach((fieldType) => {
				size += fieldType.encodedSize(protocolVersion)
			})
			return size
		}

		equals(o: any): boolean {
			if (this === o) {
				return true
			}
			if (!o || this.constructor !== o.constructor) {
				return false
			}
			if (!super.equals(o)) {
				return false
			}

			const other = o as this
			return (
				this.fieldTypes.length === other.fieldTypes.length &&
				this.fieldTypes.every((type, i) => type.equals(other.fieldTypes[i]))
			)
		}

		hashCode(): number {
			let result = super.hashCode()
			result =
				31 * result +
				this.fieldTypes.reduce((hash, type) => hash + type.hashCode(), 0)
			return result
		}
	}
}
