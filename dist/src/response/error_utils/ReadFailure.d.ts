import { PrimitiveCodec } from "../../PrimitiveCodec";
import { InetAddress } from "../../util/InetAddress";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ProtocolError } from "../ProtocolError";
export declare class ReadFailure extends ProtocolError {
    consistencyLevel: number;
    received: number;
    blockFor: number;
    numFailures: number;
    reasonMap: Map<InetAddress, number>;
    dataPresent: boolean;
    constructor(message: string, consistencyLevel: number, received: number, blockFor: number, numFailures: number, reasonMap: Map<InetAddress, number>, dataPresent: boolean);
    static SubCodec: {
        new (protocolVersion: ProtocolVersion): {
            encode<B>(dest: B, error: ProtocolError, encoder: PrimitiveCodec<B>): void;
            encodedSize(error: ProtocolError): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolError;
            errorCode: number;
            protocolVersion: ProtocolVersion;
        };
        writeReasonMap<B_2>(m: Map<InetAddress, number>, dest: B_2, encoder: PrimitiveCodec<B_2>): void;
        sizeOfReasonMap(m: Map<InetAddress, number>): number;
        readReasonMap<B_3>(source: B_3, decoder: PrimitiveCodec<B_3>): Map<InetAddress, number>;
    };
}
