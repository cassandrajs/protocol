import { InetAddress } from "./InetAddress";
export declare class InetSocketAddress {
    address: InetAddress;
    port: number;
    constructor(address: InetAddress, port: number);
    getAddress(): InetAddress;
    getPort(): number;
}
