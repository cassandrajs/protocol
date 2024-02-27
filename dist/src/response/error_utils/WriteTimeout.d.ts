import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ProtocolError } from "../ProtocolError";
export declare class WriteTimeout extends ProtocolError {
    consistencyLevel: number;
    received: number;
    blockFor: number;
    writeType: string;
    constructor(message: string, consistencyLevel: number, received: number, blockFor: number, writeType: string);
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
