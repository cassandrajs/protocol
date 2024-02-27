import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ProtocolError } from "../ProtocolError";
export declare class FunctionFailure extends ProtocolError {
    keyspace: string;
    function: string;
    argTypes: string[];
    constructor(message: string, keyspace: string, func: string, argTypes: string[]);
    static SubCodec: {
        new (protocolVersion: ProtocolVersion): {
            encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void;
            encodedSize(error: ProtocolError): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolError;
            errorCode: number;
            protocolVersion: ProtocolVersion;
        };
    };
}
