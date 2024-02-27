import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ProtocolError } from "../ProtocolError";
export declare class ReadTimeout extends ProtocolError {
    /** The consistency level of the query that triggered the exception. */
    consistencyLevel: number;
    /** The number of nodes having answered the request. */
    received: number;
    /**
     * The number of replicas whose response is required to achieve {@code consistencyLevel}.
     *
     * <p>It is possible to have {@code received >= blockFor} if {@code data_present} is false. Also
     * in the (unlikely) case where {@code consistencyLevel} is achieved but the coordinator node
     * times out while waiting for read-repair acknowledgement.
     */
    blockFor: number;
    /** Whether the replica that was asked for data responded. */
    dataPresent: boolean;
    constructor(message: string, consistencyLevel: number, received: number, blockFor: number, dataPresent: boolean);
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
