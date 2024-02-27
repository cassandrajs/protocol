export type Opcode = (typeof ProtocolConstants.Opcode)[keyof typeof ProtocolConstants.Opcode];
export type ProtocolVersion = (typeof ProtocolConstants.Version)[keyof typeof ProtocolConstants.Version];
export declare class ProtocolConstants {
    static UNSET_VALUE: Uint8Array;
    static Version: {
        readonly V3: 3;
        readonly V4: 4;
        readonly V5: 5;
        readonly V6: 6;
        readonly MIN: 3;
        readonly MAX: 5;
        /** If no beta version is currently supported, this will be negative. */
        readonly BETA: 6;
    };
    static Opcode: {
        readonly ERROR: 0;
        readonly STARTUP: 1;
        readonly READY: 2;
        readonly AUTHENTICATE: 3;
        readonly OPTIONS: 5;
        readonly SUPPORTED: 6;
        readonly QUERY: 7;
        readonly RESULT: 8;
        readonly PREPARE: 9;
        readonly EXECUTE: 10;
        readonly REGISTER: 11;
        readonly EVENT: 12;
        readonly BATCH: 13;
        readonly AUTH_CHALLENGE: 14;
        readonly AUTH_RESPONSE: 15;
        readonly AUTH_SUCCESS: 16;
    };
    static OpcodeToString(opcode: Opcode): string;
    static ResultKind: {
        readonly VOID: 1;
        readonly ROWS: 2;
        readonly SET_KEYSPACE: 3;
        readonly PREPARED: 4;
        readonly SCHEMA_CHANGE: 5;
    };
    static ErrorCode: {
        readonly SERVER_ERROR: 0;
        readonly PROTOCOL_ERROR: 10;
        readonly AUTH_ERROR: 256;
        readonly UNAVAILABLE: 4096;
        readonly OVERLOADED: 4097;
        readonly IS_BOOTSTRAPPING: 4098;
        readonly TRUNCATE_ERROR: 4099;
        readonly WRITE_TIMEOUT: 4352;
        readonly READ_TIMEOUT: 4608;
        readonly READ_FAILURE: 4864;
        readonly FUNCTION_FAILURE: 5120;
        readonly WRITE_FAILURE: 5376;
        readonly CDC_WRITE_FAILURE: 5632;
        readonly CAS_WRITE_UNKNOWN: 5888;
        readonly SYNTAX_ERROR: 8192;
        readonly UNAUTHORIZED: 8448;
        readonly INVALID: 8704;
        readonly CONFIG_ERROR: 8960;
        readonly ALREADY_EXISTS: 9216;
        readonly UNPREPARED: 9472;
    };
    static ConsistencyLevel: {
        readonly ANY: 0;
        readonly ONE: 1;
        readonly TWO: 2;
        readonly THREE: 3;
        readonly QUORUM: 4;
        readonly ALL: 5;
        readonly LOCAL_QUORUM: 6;
        readonly EACH_QUORUM: 7;
        readonly SERIAL: 8;
        readonly LOCAL_SERIAL: 9;
        readonly LOCAL_ONE: 10;
    };
    static WriteType: {
        readonly SIMPLE: "SIMPLE";
        readonly BATCH: "BATCH";
        readonly UNLOGGED_BATCH: "UNLOGGED_BATCH";
        readonly COUNTER: "COUNTER";
        readonly BATCH_LOG: "BATCH_LOG";
        readonly VIEW: "VIEW";
        readonly CDC: "CDC";
    };
    static DataType: {
        readonly CUSTOM: 0;
        readonly ASCII: 1;
        readonly BIGINT: 2;
        readonly BLOB: 3;
        readonly BOOLEAN: 4;
        readonly COUNTER: 5;
        readonly DECIMAL: 6;
        readonly DOUBLE: 7;
        readonly FLOAT: 8;
        readonly INT: 9;
        readonly TIMESTAMP: 11;
        readonly UUID: 12;
        readonly VARCHAR: 13;
        readonly VARINT: 14;
        readonly TIMEUUID: 15;
        readonly INET: 16;
        readonly DATE: 17;
        readonly TIME: 18;
        readonly SMALLINT: 19;
        readonly TINYINT: 20;
        readonly DURATION: 21;
        readonly LIST: 32;
        readonly MAP: 33;
        readonly SET: 34;
        readonly UDT: 48;
        readonly TUPLE: 49;
    };
    static EventType: {
        readonly TOPOLOGY_CHANGE: "TOPOLOGY_CHANGE";
        readonly STATUS_CHANGE: "STATUS_CHANGE";
        readonly SCHEMA_CHANGE: "SCHEMA_CHANGE";
    };
    static SchemaChangeType: {
        readonly CREATED: "CREATED";
        readonly UPDATED: "UPDATED";
        readonly DROPPED: "DROPPED";
    };
    static SchemaChangeTarget: {
        readonly KEYSPACE: "KEYSPACE";
        readonly TABLE: "TABLE";
        readonly TYPE: "TYPE";
        readonly FUNCTION: "FUNCTION";
        readonly AGGREGATE: "AGGREGATE";
    };
    static TopologyChangeType: {
        readonly NEW_NODE: "NEW_NODE";
        readonly REMOVED_NODE: "REMOVED_NODE";
    };
    static StatusChangeType: {
        readonly UP: "UP";
        readonly DOWN: "DOWN";
    };
    static BatchType: {
        readonly LOGGED: 0;
        readonly UNLOGGED: 1;
        readonly COUNTER: 2;
    };
    static FrameFlag: {
        readonly COMPRESSED: 1;
        readonly TRACING: 2;
        readonly CUSTOM_PAYLOAD: 4;
        readonly WARNING: 8;
        readonly USE_BETA: 16;
    };
    static QueryFlag: {
        readonly VALUES: 1;
        readonly SKIP_METADATA: 2;
        readonly PAGE_SIZE: 4;
        readonly PAGING_STATE: 8;
        readonly SERIAL_CONSISTENCY: 16;
        readonly DEFAULT_TIMESTAMP: 32;
        readonly VALUE_NAMES: 64;
        readonly WITH_KEYSPACE: 128;
        readonly NOW_IN_SECONDS: 256;
    };
    static RowsFlag: {
        readonly GLOBAL_TABLES_SPEC: 1;
        readonly HAS_MORE_PAGES: 2;
        readonly NO_METADATA: 4;
        readonly METADATA_CHANGED: 8;
    };
}
export declare const OpcodeStrings: {
    [k: string]: string;
};
