import { IllegalStateError } from "../errors/IllegalStateError";
import { PrimitiveSizes } from "../PrimitiveSizes";
import { ProtocolMessage } from "../ProtocolMessage";
import { ProtocolMessageCodec } from "../ProtocolMessageCodec";
import { ProtocolConstants } from "../util/ProtocolConstants";
import { QueryOptions } from "./query_utils/QueryOptions";
import { Values } from "./query_utils/Values";
export class Batch extends ProtocolMessage {
    type;
    queriesOrIds;
    values;
    consistency;
    serialConsistency;
    defaultTimestamp;
    keyspace;
    nowInSeconds;
    flags;
    constructor(flags, type, queriesOrIds, values, consistency, serialConsistency, defaultTimestamp, keyspace, nowInSeconds) {
        super(false, ProtocolConstants.Opcode.BATCH);
        this.type = type;
        this.queriesOrIds = queriesOrIds;
        this.values = values;
        this.consistency = consistency;
        this.serialConsistency = serialConsistency;
        this.defaultTimestamp = defaultTimestamp;
        this.keyspace = keyspace;
        this.nowInSeconds = nowInSeconds;
        this.flags = flags;
    }
    computeFlags(serialConsistency, defaultTimestamp, keyspace, nowInSeconds) {
        let flags = 0;
        if (serialConsistency !== ProtocolConstants.ConsistencyLevel.SERIAL) {
            flags |= 1;
        }
        if (defaultTimestamp !== QueryOptions.NO_DEFAULT_TIMESTAMP) {
            flags |= 1 << 1;
        }
        if (keyspace !== null) {
            flags |= 1 << 2;
        }
        if (nowInSeconds !== QueryOptions.NO_NOW_IN_SECONDS) {
            flags |= 1 << 3;
        }
        return flags;
    }
    toString() {
        return "BATCH(" + this.queriesOrIds.length + " statements)";
    }
    static Codec = class extends ProtocolMessageCodec {
        constructor(protocolVersion) {
            super(ProtocolConstants.Opcode.BATCH, protocolVersion);
        }
        encode(dest, message, encoder) {
            const batch = message;
            encoder.writeByte(batch.type, dest);
            const queryCount = batch.queriesOrIds.length;
            encoder.writeUnsignedShort(queryCount, dest);
            for (let i = 0; i < queryCount; i++) {
                const q = batch.queriesOrIds[i];
                if (typeof q === "string") {
                    encoder.writeByte(0, dest);
                    encoder.writeLongString(q, dest);
                }
                else {
                    encoder.writeByte(1, dest);
                    encoder.writeShortBytes(q, dest);
                }
                Values.writePositionalValues(batch.values[i], dest, encoder);
            }
            encoder.writeUnsignedShort(batch.consistency, dest);
            if (this.protocolVersion >= ProtocolConstants.Version.V5) {
                encoder.writeInt(batch.flags, dest);
            }
            else {
                encoder.writeByte(batch.flags, dest);
            }
            if ((batch.flags & (1 << 0)) !== 0) {
                encoder.writeUnsignedShort(batch.serialConsistency, dest);
            }
            if ((batch.flags & (1 << 1)) !== 0) {
                encoder.writeLong(batch.defaultTimestamp, dest);
            }
            if ((batch.flags & (1 << 2)) !== 0) {
                encoder.writeString(batch.keyspace, dest);
            }
            if ((batch.flags & (1 << 3)) !== 0) {
                encoder.writeInt(batch.nowInSeconds, dest);
            }
        }
        encodedSize(message) {
            const batch = message;
            let size = PrimitiveSizes.BYTE; // type
            size += PrimitiveSizes.SHORT; // number of queries
            const queryCount = batch.queriesOrIds.length;
            if (!(queryCount <= 0xffff)) {
                throw new IllegalStateError(`Batch messages can contain at most ${0xffff} queries`);
            }
            if (!(batch.values.length === queryCount)) {
                throw new IllegalStateError(`Batch contains ${queryCount} queries but ${batch.values.length} value lists`);
            }
            for (let i = 0; i < queryCount; i++) {
                const q = batch.queriesOrIds[i];
                size +=
                    PrimitiveSizes.BYTE +
                        (typeof q === "string"
                            ? PrimitiveSizes.sizeOfLongString(q)
                            : PrimitiveSizes.sizeOfShortBytes(q));
                size += Values.sizeOfPositionalValues(batch.values[i]);
            }
            size += PrimitiveSizes.SHORT; // consistency level
            size +=
                this.protocolVersion >= ProtocolConstants.Version.V5
                    ? PrimitiveSizes.INT
                    : PrimitiveSizes.BYTE; // flags
            if ((batch.flags & (1 << 0)) !== 0) {
                size += PrimitiveSizes.SHORT;
            }
            if ((batch.flags & (1 << 1)) !== 0) {
                size += PrimitiveSizes.LONG;
            }
            if ((batch.flags & (1 << 2)) !== 0) {
                size += PrimitiveSizes.sizeOfString(batch.keyspace);
            }
            if ((batch.flags & (1 << 3)) !== 0) {
                size += PrimitiveSizes.INT;
            }
            return size;
        }
        decode(source, decoder) {
            const type = decoder.readByte(source);
            const queryCount = decoder.readUnsignedShort(source);
            const queriesOrIds = [];
            const values = [];
            for (let i = 0; i < queryCount; i++) {
                const isQueryString = decoder.readByte(source) === 0;
                queriesOrIds.push(isQueryString
                    ? decoder.readLongString(source)
                    : decoder.readShortBytes(source));
                values.push(Values.readPositionalValues(source, decoder));
            }
            const consistency = decoder.readUnsignedShort(source);
            const flags = this.protocolVersion >= ProtocolConstants.Version.V5
                ? decoder.readInt(source)
                : decoder.readByte(source);
            const serialConsistency = (flags & (1 << 0)) !== 0
                ? decoder.readUnsignedShort(source)
                : ProtocolConstants.ConsistencyLevel.SERIAL;
            const defaultTimestamp = (flags & (1 << 1)) !== 0
                ? decoder.readLong(source)
                : QueryOptions.NO_DEFAULT_TIMESTAMP;
            const keyspace = (flags & (1 << 2)) !== 0 ? decoder.readString(source) : null;
            const nowInSeconds = (flags & (1 << 3)) !== 0
                ? decoder.readInt(source)
                : QueryOptions.NO_NOW_IN_SECONDS;
            return new Batch(flags, type, queriesOrIds, values, consistency, serialConsistency, defaultTimestamp, keyspace, nowInSeconds);
        }
    };
}
