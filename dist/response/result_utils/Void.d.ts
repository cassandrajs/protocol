import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolMessage } from "../../ProtocolMessage";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { Result } from "../Result";
export declare class VoidResult extends Result {
    static readonly INSTANCE: VoidResult;
    private constructor();
    toString(): string;
    static SubCodec: {
        new (protocolVersion: ProtocolVersion): {
            encode<B>(dest: B, message: ProtocolMessage, encoder: PrimitiveCodec<B>): void;
            encodedSize(message: ProtocolMessage): number;
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>): ProtocolMessage;
            kind: number;
            protocolVersion: ProtocolVersion;
        };
    };
}
