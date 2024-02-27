import { InetAddress } from "./util/InetAddress";
import { InetSocketAddress } from "./util/InetSocketAddress";
export declare class PrimitiveSizes {
    static BYTE: number;
    static SHORT: number;
    static INT: number;
    static LONG: number;
    static UUID: number;
    static sizeOfString(str: string): number;
    static sizeOfLongString(s: string): number;
    static sizeOfStringList(l: string[]): number;
    static sizeOfBytes(bytes: Uint8Array | number[]): number;
    static sizeOfShortBytes(bytes: Uint8Array | number[]): number;
    static sizeOfStringMap(m: {
        [key: string]: string;
    }): number;
    static sizeOfStringMultimap(m: {
        [key: string]: string[];
    }): number;
    static sizeOfBytesMap(m: {
        [key: string]: Uint8Array;
    }): number;
    static encodedUTF8Length(st: string): number;
    static sizeOfInet(address: InetSocketAddress): number;
    static sizeOfInetAddr(address: InetAddress): number;
}
