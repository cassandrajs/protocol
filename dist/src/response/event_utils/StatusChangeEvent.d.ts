import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolMessage } from "../../ProtocolMessage";
import { InetSocketAddress } from "../../util/InetSocketAddress";
import { ProtocolVersion } from "../../util/ProtocolConstants";
import { ProtocolEvent } from "../ProtocolEvent";
export declare class StatusChangeEvent extends ProtocolEvent {
    changeType: string;
    address: InetSocketAddress;
    constructor(changeType: string, address: InetSocketAddress);
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
