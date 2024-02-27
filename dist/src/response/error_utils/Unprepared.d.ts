import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ProtocolError } from "../ProtocolError";
export declare class Unprepared extends ProtocolError {
    id: number[];
    constructor(message: string, id: number[]);
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
