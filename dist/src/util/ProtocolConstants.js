export class ProtocolConstants {
    static UNSET_VALUE = new Uint8Array(0);
    static Version = {
        V3: 3,
        V4: 4,
        V5: 5,
        V6: 6,
        MIN: 3,
        MAX: 5,
        /** If no beta version is currently supported, this will be negative. */
        BETA: 6,
    };
    static Opcode = {
        ERROR: 0x00,
        STARTUP: 0x01,
        READY: 0x02,
        AUTHENTICATE: 0x03,
        OPTIONS: 0x05,
        SUPPORTED: 0x06,
        QUERY: 0x07,
        RESULT: 0x08,
        PREPARE: 0x09,
        EXECUTE: 0x0a,
        REGISTER: 0x0b,
        EVENT: 0x0c,
        BATCH: 0x0d,
        AUTH_CHALLENGE: 0x0e,
        AUTH_RESPONSE: 0x0f,
        AUTH_SUCCESS: 0x10,
    };
    static OpcodeToString(opcode) {
        return OpcodeStrings[opcode] || "0x" + opcode.toString(16);
    }
    static ResultKind = {
        VOID: 0x0001,
        ROWS: 0x0002,
        SET_KEYSPACE: 0x0003,
        PREPARED: 0x0004,
        SCHEMA_CHANGE: 0x0005,
    };
    static ErrorCode = {
        SERVER_ERROR: 0x0000,
        PROTOCOL_ERROR: 0x000a,
        AUTH_ERROR: 0x0100,
        UNAVAILABLE: 0x1000,
        OVERLOADED: 0x1001,
        IS_BOOTSTRAPPING: 0x1002,
        TRUNCATE_ERROR: 0x1003,
        WRITE_TIMEOUT: 0x1100,
        READ_TIMEOUT: 0x1200,
        READ_FAILURE: 0x1300,
        FUNCTION_FAILURE: 0x1400,
        WRITE_FAILURE: 0x1500,
        CDC_WRITE_FAILURE: 0x1600,
        CAS_WRITE_UNKNOWN: 0x1700,
        SYNTAX_ERROR: 0x2000,
        UNAUTHORIZED: 0x2100,
        INVALID: 0x2200,
        CONFIG_ERROR: 0x2300,
        ALREADY_EXISTS: 0x2400,
        UNPREPARED: 0x2500,
    };
    static ConsistencyLevel = {
        ANY: 0x0000,
        ONE: 0x0001,
        TWO: 0x0002,
        THREE: 0x0003,
        QUORUM: 0x0004,
        ALL: 0x0005,
        LOCAL_QUORUM: 0x0006,
        EACH_QUORUM: 0x0007,
        SERIAL: 0x0008,
        LOCAL_SERIAL: 0x0009,
        LOCAL_ONE: 0x000a,
    };
    static WriteType = {
        SIMPLE: "SIMPLE",
        BATCH: "BATCH",
        UNLOGGED_BATCH: "UNLOGGED_BATCH",
        COUNTER: "COUNTER",
        BATCH_LOG: "BATCH_LOG",
        VIEW: "VIEW",
        CDC: "CDC",
    };
    static DataType = {
        CUSTOM: 0x0000,
        ASCII: 0x0001,
        BIGINT: 0x0002,
        BLOB: 0x0003,
        BOOLEAN: 0x0004,
        COUNTER: 0x0005,
        DECIMAL: 0x0006,
        DOUBLE: 0x0007,
        FLOAT: 0x0008,
        INT: 0x0009,
        TIMESTAMP: 0x000b,
        UUID: 0x000c,
        VARCHAR: 0x000d,
        VARINT: 0x000e,
        TIMEUUID: 0x000f,
        INET: 0x0010,
        DATE: 0x0011,
        TIME: 0x0012,
        SMALLINT: 0x0013,
        TINYINT: 0x0014,
        DURATION: 0x0015, // v5+
        LIST: 0x0020,
        MAP: 0x0021,
        SET: 0x0022,
        UDT: 0x0030,
        TUPLE: 0x0031,
    };
    static EventType = {
        TOPOLOGY_CHANGE: "TOPOLOGY_CHANGE",
        STATUS_CHANGE: "STATUS_CHANGE",
        SCHEMA_CHANGE: "SCHEMA_CHANGE",
    };
    static SchemaChangeType = {
        CREATED: "CREATED",
        UPDATED: "UPDATED",
        DROPPED: "DROPPED",
    };
    static SchemaChangeTarget = {
        KEYSPACE: "KEYSPACE",
        TABLE: "TABLE",
        TYPE: "TYPE",
        FUNCTION: "FUNCTION",
        AGGREGATE: "AGGREGATE",
    };
    static TopologyChangeType = {
        NEW_NODE: "NEW_NODE",
        REMOVED_NODE: "REMOVED_NODE",
    };
    static StatusChangeType = {
        UP: "UP",
        DOWN: "DOWN",
    };
    static BatchType = {
        LOGGED: 0x00,
        UNLOGGED: 0x01,
        COUNTER: 0x02,
    };
    static FrameFlag = {
        COMPRESSED: 0x01,
        TRACING: 0x02,
        CUSTOM_PAYLOAD: 0x04,
        WARNING: 0x08,
        USE_BETA: 0x10,
    };
    static QueryFlag = {
        VALUES: 0x00000001,
        SKIP_METADATA: 0x00000002,
        PAGE_SIZE: 0x00000004,
        PAGING_STATE: 0x00000008,
        SERIAL_CONSISTENCY: 0x00000010,
        DEFAULT_TIMESTAMP: 0x00000020,
        VALUE_NAMES: 0x00000040,
        WITH_KEYSPACE: 0x00000080,
        NOW_IN_SECONDS: 0x00000100,
    };
    static RowsFlag = {
        GLOBAL_TABLES_SPEC: 0x00000001,
        HAS_MORE_PAGES: 0x00000002,
        NO_METADATA: 0x00000004,
        METADATA_CHANGED: 0x00000008,
    };
}
export const OpcodeStrings = Object.fromEntries(Object.entries(ProtocolConstants.Opcode).map((val) => [val[1], val[0]]));
