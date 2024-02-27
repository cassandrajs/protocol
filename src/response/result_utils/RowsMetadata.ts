import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { Flags } from "../../util/Flags"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ColumnSpec } from "./ColumnSpec"
import { RawType } from "./RawType"

export class RowsMetadata {
	columnSpecs: ColumnSpec[]
	columnCount: number
	pagingState: Uint8Array
	pkIndices: number[]
	newResultMetadataId: number[]
	flags: number

	constructor(
		flags: number,
		columnSpecs: ColumnSpec[],
		columnCount: number,
		pagingState: Uint8Array,
		pkIndices: number[],
		newResultMetadataId: number[]
	) {
		this.columnSpecs = columnSpecs
		this.columnCount = columnCount
		this.pagingState = pagingState
		this.pkIndices = pkIndices
		this.newResultMetadataId = newResultMetadataId
		this.flags = flags
	}

	static fromColumnSpecs(
		columnSpecs: ColumnSpec[],
		pagingState: Uint8Array,
		pkIndices: number[],
		newResultMetadataId: number[]
	): RowsMetadata {
		return new RowsMetadata(
			RowsMetadata.computeFlags(
				false,
				columnSpecs,
				pagingState,
				newResultMetadataId
			),
			columnSpecs,
			columnSpecs.length,
			pagingState,
			pkIndices,
			newResultMetadataId
		)
	}

	static noMetadata(
		columnCount: number,
		pagingState: Uint8Array,
		pkIndices: number[],
		newResultMetadataId: number[]
	): RowsMetadata {
		return new RowsMetadata(
			RowsMetadata.computeFlags(true, [], pagingState, newResultMetadataId),
			[],
			columnCount,
			pagingState,
			pkIndices,
			newResultMetadataId
		)
	}

	static computeFlags(
		noMetadata: boolean,
		columnSpecs: ColumnSpec[],
		pagingState: Uint8Array,
		newResultMetadataId: number[]
	): number {
		let flags = 0
		if (noMetadata) {
			flags = Flags.add(flags, ProtocolConstants.RowsFlag.NO_METADATA)
		} else if (this.haveSameTable(columnSpecs)) {
			flags = Flags.add(flags, ProtocolConstants.RowsFlag.GLOBAL_TABLES_SPEC)
		}
		if (pagingState != null) {
			flags = Flags.add(flags, ProtocolConstants.RowsFlag.HAS_MORE_PAGES)
		}
		if (newResultMetadataId != null) {
			flags = Flags.add(flags, ProtocolConstants.RowsFlag.METADATA_CHANGED)
		}
		return flags
	}

	encode<B>(
		dest: B,
		encoder: PrimitiveCodec<B>,
		withPkIndices: boolean,
		protocolVersion: ProtocolVersion
	): void {
		encoder.writeInt(this.flags, dest)
		encoder.writeInt(this.columnCount, dest)
		if (withPkIndices) {
			if (this.pkIndices == null) {
				encoder.writeInt(0, dest)
			} else {
				encoder.writeInt(this.pkIndices.length, dest)
				for (const pkIndex of this.pkIndices) {
					encoder.writeUnsignedShort(pkIndex, dest)
				}
			}
		}
		if (Flags.contains(this.flags, ProtocolConstants.RowsFlag.HAS_MORE_PAGES)) {
			encoder.writeBytes(this.pagingState, dest)
		}
		if (
			Flags.contains(this.flags, ProtocolConstants.RowsFlag.METADATA_CHANGED)
		) {
			encoder.writeShortBytes(this.newResultMetadataId, dest)
		}
		if (
			!Flags.contains(this.flags, ProtocolConstants.RowsFlag.NO_METADATA) &&
			this.columnSpecs.length > 0
		) {
			let globalTable = Flags.contains(
				this.flags,
				ProtocolConstants.RowsFlag.GLOBAL_TABLES_SPEC
			)
			if (globalTable) {
				const firstSpec = this.columnSpecs[0]
				encoder.writeString(firstSpec.ksName, dest)
				encoder.writeString(firstSpec.tableName, dest)
			}
			for (const spec of this.columnSpecs) {
				if (!globalTable) {
					encoder.writeString(spec.ksName, dest)
					encoder.writeString(spec.tableName, dest)
				}
				encoder.writeString(spec.name, dest)
				spec.type.encode(dest, encoder, protocolVersion)
			}
		}
	}

	encodedSize(
		withPkIndices: boolean,
		protocolVersion: ProtocolVersion
	): number {
		let size = PrimitiveSizes.INT // flags
		size += PrimitiveSizes.INT // column count
		if (
			Flags.contains(this.flags, ProtocolConstants.RowsFlag.METADATA_CHANGED)
		) {
			size += PrimitiveSizes.sizeOfShortBytes(this.newResultMetadataId)
		}
		if (withPkIndices) {
			size += PrimitiveSizes.INT
			if (this.pkIndices != null) {
				size += this.pkIndices.length * PrimitiveSizes.SHORT
			}
		}
		if (Flags.contains(this.flags, ProtocolConstants.RowsFlag.HAS_MORE_PAGES)) {
			size += PrimitiveSizes.sizeOfBytes(this.pagingState)
		}
		if (
			!Flags.contains(this.flags, ProtocolConstants.RowsFlag.NO_METADATA) &&
			this.columnSpecs.length > 0
		) {
			let globalTable = Flags.contains(
				this.flags,
				ProtocolConstants.RowsFlag.GLOBAL_TABLES_SPEC
			)
			if (globalTable) {
				const firstSpec = this.columnSpecs[0]
				size += PrimitiveSizes.sizeOfString(firstSpec.ksName)
				size += PrimitiveSizes.sizeOfString(firstSpec.tableName)
			}
			for (const spec of this.columnSpecs) {
				if (!globalTable) {
					size += PrimitiveSizes.sizeOfString(spec.ksName)
					size += PrimitiveSizes.sizeOfString(spec.tableName)
				}
				size += PrimitiveSizes.sizeOfString(spec.name)
				size += spec.type.encodedSize(protocolVersion)
			}
		}
		return size
	}

	static decode<B>(
		source: B,
		decoder: PrimitiveCodec<B>,
		withPkIndices: boolean,
		protocolVersion: ProtocolVersion
	): RowsMetadata {
		const flags = decoder.readInt(source)
		const columnCount = decoder.readInt(source)

		let pkIndices = null
		if (withPkIndices) {
			const pkCount = decoder.readInt(source)
			if (pkCount > 0) {
				pkIndices = new Array(pkCount)
				for (let i = 0; i < pkCount; i++) {
					pkIndices[i] = decoder.readUnsignedShort(source)
				}
			}
		}

		const state = Flags.contains(
			flags,
			ProtocolConstants.RowsFlag.HAS_MORE_PAGES
		)
			? decoder.readBytes(source)
			: null
		const newResultMetadataId = Flags.contains(
			flags,
			ProtocolConstants.RowsFlag.METADATA_CHANGED
		)
			? decoder.readShortBytes(source)
			: null

		let columnSpecs: ColumnSpec[]
		if (Flags.contains(flags, ProtocolConstants.RowsFlag.NO_METADATA)) {
			columnSpecs = []
		} else {
			const globalTablesSpec = Flags.contains(
				flags,
				ProtocolConstants.RowsFlag.GLOBAL_TABLES_SPEC
			)
			let globalKsName, globalCfName
			if (globalTablesSpec) {
				globalKsName = decoder.readString(source)
				globalCfName = decoder.readString(source)
			}

			columnSpecs = []
			for (let i = 0; i < columnCount; i++) {
				const ksName = globalTablesSpec
					? globalKsName
					: decoder.readString(source)
				const cfName = globalTablesSpec
					? globalCfName
					: decoder.readString(source)
				const name = decoder.readString(source)
				const type = RawType.decode(source, decoder, protocolVersion)
				columnSpecs.push(new ColumnSpec(ksName, cfName, name, i, type))
			}
		}
		return new RowsMetadata(
			flags,
			columnSpecs,
			columnCount,
			state,
			pkIndices,
			newResultMetadataId
		)
	}

	static haveSameTable(specs: ColumnSpec[]): boolean {
		if (specs.length === 0) {
			return false
		}
		let first = true
		let ksName, tableName
		for (const spec of specs) {
			if (first) {
				first = false
				ksName = spec.ksName
				tableName = spec.tableName
			} else if (spec.ksName !== ksName || spec.tableName !== tableName) {
				return false
			}
		}
		return true
	}
}
