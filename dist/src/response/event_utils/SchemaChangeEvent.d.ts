import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolMessage } from "../../ProtocolMessage";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ProtocolEvent } from "../ProtocolEvent";
export declare class SchemaChangeEvent extends ProtocolEvent {
    changeType: string;
    target: string;
    keyspace: string;
    object: string | null;
    schemaArguments: string[] | null;
    constructor(changeType: string, target: string, keyspace: string, object: string | null, schemaArguments: string[] | null);
    toString(): string;
    static SubCodec: {
        new (protocolVersion: ProtocolVersion | string): {
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            type: string;
            protocolVersion: ProtocolVersion;
        };
    };
}
