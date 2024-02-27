import Long from "long"
import { IllegalArgumentError } from "../../errors/IllegalArgumentError"
import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { Flags } from "../../util/Flags"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { Values } from "./Values"

export class QueryOptionsCodec {
	protocolVersion: ProtocolVersion

	constructor(protocolVersion: ProtocolVersion) {
		this.protocolVersion = protocolVersion
	}

	encode<B>(dest: B, options: QueryOptions, encoder: PrimitiveCodec<B>): void {
		encoder.writeUnsignedShort(options.consistency, dest)
		if (this.protocolVersion >= ProtocolConstants.Version.V5) {
			encoder.writeInt(options.flags, dest)
		} else {
			encoder.writeByte(options.flags, dest)
		}
		if (Flags.contains(options.flags, 0)) {
			if (Flags.contains(options.flags, 1)) {
				Values.writeNamedValues(options.namedValues, dest, encoder)
			} else {
				Values.writePositionalValues(options.positionalValues, dest, encoder)
			}
		}
		if (Flags.contains(options.flags, 2)) {
			encoder.writeInt(options.pageSize, dest)
		}
		if (Flags.contains(options.flags, 3)) {
			encoder.writeBytes(options.pagingState, dest)
		}
		if (Flags.contains(options.flags, 4)) {
			encoder.writeUnsignedShort(options.serialConsistency, dest)
		}
		if (Flags.contains(options.flags, 5)) {
			encoder.writeLong(options.defaultTimestamp, dest)
		}
		if (Flags.contains(options.flags, 6)) {
			encoder.writeString(options.keyspace, dest)
		}
		if (Flags.contains(options.flags, 7)) {
			encoder.writeInt(options.nowInSeconds, dest)
		}
	}

	encodedSize(options: QueryOptions): number {
		let size: number = 0
		size += PrimitiveSizes.SHORT
		size += this.queryFlagsSize(this.protocolVersion)
		if (Flags.contains(options.flags, 0)) {
			if (Flags.contains(options.flags, 1)) {
				size += Values.sizeOfNamedValues(options.namedValues)
			} else {
				size += Values.sizeOfPositionalValues(options.positionalValues)
			}
		}
		if (Flags.contains(options.flags, 2)) {
			size += PrimitiveSizes.INT
		}
		if (Flags.contains(options.flags, 3)) {
			size += PrimitiveSizes.sizeOfBytes(options.pagingState)
		}
		if (Flags.contains(options.flags, 4)) {
			size += PrimitiveSizes.SHORT
		}
		if (Flags.contains(options.flags, 5)) {
			size += PrimitiveSizes.LONG
		}
		if (Flags.contains(options.flags, 6)) {
			size += PrimitiveSizes.sizeOfString(options.keyspace)
		}
		if (Flags.contains(options.flags, 7)) {
			size += PrimitiveSizes.INT
		}
		return size
	}

	decode<B>(source: B, decoder: PrimitiveCodec<B>): QueryOptions {
		const consistency: number = decoder.readUnsignedShort(source)
		const flags: number =
			this.protocolVersion >= ProtocolConstants.Version.V5
				? decoder.readInt(source)
				: decoder.readByte(source)
		let positionalValues: Uint8Array[] = []
		let namedValues: { [key: string]: Uint8Array } = {}
		if (Flags.contains(flags, 0)) {
			if (Flags.contains(flags, 1)) {
				namedValues = Values.readNamedValues(source, decoder)
			} else {
				positionalValues = Values.readPositionalValues(source, decoder)
			}
		}
		const skipMetadata: boolean = Flags.contains(flags, 2)
		const pageSize: number = Flags.contains(flags, 3)
			? decoder.readInt(source)
			: -1
		const pagingState: Uint8Array | null = Flags.contains(flags, 4)
			? decoder.readBytes(source)
			: null
		const serialConsistency: number = Flags.contains(flags, 5)
			? decoder.readUnsignedShort(source)
			: ProtocolConstants.ConsistencyLevel.SERIAL
		const defaultTimestamp: Long = Flags.contains(flags, 6)
			? decoder.readLong(source)
			: QueryOptions.NO_DEFAULT_TIMESTAMP
		const keyspace: string | null = Flags.contains(flags, 7)
			? decoder.readString(source)
			: null
		const nowInSeconds: number = Flags.contains(flags, 8)
			? decoder.readInt(source)
			: QueryOptions.NO_NOW_IN_SECONDS
		return new QueryOptions(
			flags,
			consistency,
			positionalValues,
			namedValues,
			skipMetadata,
			pageSize,
			pagingState,
			serialConsistency,
			defaultTimestamp,
			keyspace,
			nowInSeconds
		)
	}

	queryFlagsSize(protocolVersion: ProtocolVersion): number {
		return protocolVersion >= ProtocolConstants.Version.V5
			? PrimitiveSizes.INT
			: PrimitiveSizes.BYTE
	}
}

export class QueryOptions {
	static NO_DEFAULT_TIMESTAMP: Long = Long.MIN_VALUE
	static NO_NOW_IN_SECONDS: number = Number.MIN_VALUE

	static DEFAULT: QueryOptions = new QueryOptions(
		undefined,
		ProtocolConstants.ConsistencyLevel.ONE,
		[],
		{},
		false,
		-1,
		null,
		ProtocolConstants.ConsistencyLevel.SERIAL,
		QueryOptions.NO_DEFAULT_TIMESTAMP,
		null,
		QueryOptions.NO_NOW_IN_SECONDS
	)

	flags: number
	consistency: number
	positionalValues: Uint8Array[]
	namedValues: { [key: string]: Uint8Array }
	skipMetadata: boolean
	pageSize: number
	pagingState: Uint8Array
	serialConsistency: number
	defaultTimestamp: Long
	keyspace: string
	nowInSeconds: number

	constructor(
		flags: number,
		consistency: number,
		positionalValues: Uint8Array[],
		namedValues: { [key: string]: Uint8Array },
		skipMetadata: boolean,
		pageSize: number,
		pagingState: Uint8Array,
		serialConsistency: number,
		defaultTimestamp: Long,
		keyspace: string,
		nowInSeconds: number
	) {
		if (!flags) {
			flags = QueryOptions.computeFlags(
				positionalValues,
				namedValues,
				skipMetadata,
				pageSize,
				pagingState,
				serialConsistency,
				defaultTimestamp,
				keyspace,
				nowInSeconds
			)
		}

		if (
			positionalValues.length >= 0 &&
			namedValues &&
			Object.values(namedValues).length >= 0
		) {
			throw new IllegalArgumentError(
				"Can't have both positional and named values"
			)
		}

		this.flags = flags
		this.consistency = consistency
		this.positionalValues = positionalValues
		this.namedValues = namedValues
		this.skipMetadata = skipMetadata
		this.pageSize = pageSize
		this.pagingState = pagingState
		this.serialConsistency = serialConsistency
		this.defaultTimestamp = defaultTimestamp
		this.keyspace = keyspace
		this.nowInSeconds = nowInSeconds
	}

	toString(): string {
		return `[cl=${this.consistency}, positionalVals=${this.positionalValues}, namedVals=${this.namedValues}, skip=${this.skipMetadata}, psize=${this.pageSize}, state=${this.pagingState}, serialCl=${this.serialConsistency}]`
	}

	static computeFlags(
		positionalValues: Uint8Array[],
		namedValues: { [key: string]: Uint8Array },
		skipMetadata: boolean,
		pageSize: number,
		pagingState: any | null,
		serialConsistency: number,
		defaultTimestamp: Long,
		keyspace: string | null,
		nowInSeconds: number
	): number {
		let flags = 0
		if (positionalValues.length > 0) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.VALUES)
		}
		if (Object.keys(namedValues).length > 0) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.VALUES)
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.VALUE_NAMES)
		}
		if (skipMetadata) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.SKIP_METADATA)
		}
		if (pageSize > 0) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.PAGE_SIZE)
		}
		if (pagingState !== null) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.PAGING_STATE)
		}
		if (serialConsistency !== ProtocolConstants.ConsistencyLevel.SERIAL) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.SERIAL_CONSISTENCY)
		}
		if (defaultTimestamp !== QueryOptions.NO_DEFAULT_TIMESTAMP) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.DEFAULT_TIMESTAMP)
		}
		if (keyspace !== null) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.WITH_KEYSPACE)
		}
		if (nowInSeconds !== QueryOptions.NO_NOW_IN_SECONDS) {
			flags = Flags.add(flags, ProtocolConstants.QueryFlag.NOW_IN_SECONDS)
		}
		return flags
	}

	static Codec = QueryOptionsCodec
}
