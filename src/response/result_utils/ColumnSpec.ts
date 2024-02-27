import { HashObject } from "../../util/HashObject"
import { RawType } from "./RawType"

export class ColumnSpec {
	ksName: string
	tableName: string
	name: string
	index: number
	type: RawType

	constructor(
		ksName: string,
		tableName: string,
		name: string,
		index: number,
		type: RawType
	) {
		this.ksName = ksName
		this.tableName = tableName
		this.name = name
		this.index = index
		this.type = type
	}

	equals(other: any): boolean {
		if (other === this) {
			return true
		} else if (other instanceof ColumnSpec) {
			const that = other as ColumnSpec
			return (
				this.ksName === that.ksName &&
				this.tableName === that.tableName &&
				this.name === that.name &&
				this.type === that.type
			)
		} else {
			return false
		}
	}

	hashCode(): number {
		return (
			HashObject(this.ksName) ^
			HashObject(this.tableName) ^
			HashObject(this.name) ^
			this.type.hashCode()
		)
	}
}
