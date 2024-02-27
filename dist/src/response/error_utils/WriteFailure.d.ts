import { PrimitiveCodec } from "../../PrimitiveCodec";
import { InetAddress } from "../../util/InetAddress";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ProtocolError } from "../ProtocolError";
export declare class WriteFailure extends ProtocolError {
    consistencyLevel: number;
    received: number;
    blockFor: number;
    numFailures: number;
    reasonMap: Map<InetAddress, number>;
    writeType: string;
    constructor(message: string, consistencyLevel: number, received: number, blockFor: number, numFailures: number, reasonMap: Map<InetAddress, number>, writeType: string);
    static SubCodec: {
        new (protocolVersion: ProtocolVersion): {
            encode<B>(dest: B, message: ProtocolError, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolError): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolError;
            errorCode: number;
            protocolVersion: ProtocolVersion;
        };
    };
}
