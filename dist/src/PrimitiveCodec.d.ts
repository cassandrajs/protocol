import Long from "long";
import { InetAddress } from "./util/InetAddress";
import { InetSocketAddress } from "./util/InetSocketAddress";
import { UUID } from "./util/UUID";
export declare abstract class PrimitiveCodec<B> {
    abstract allocate(size: number): B;
    abstract release(toRelease: B): void;
    abstract sizeOf(toMeasure: B): number;
    abstract concat(left: B, right: B): B;
    abstract markReaderIndex(source: B): void;
    abstract resetReaderIndex(source: B): void;
    abstract readByte(source: B): number;
    abstract readInt(source: B, offset?: number): number;
    abstract readInetAddr(source: B): InetAddress;
    abstract readLong(source: B): Long;
    abstract readUnsignedShort(source: B): number;
    abstract readBytes(source: B): Uint8Array;
    abstract readShortBytes(source: B): number[];
    abstract readString(source: B): string;
    abstract readLongString(source: B): string;
    abstract readRetainedSlice(source: B, sliceLength: number): B;
    abstract updateCrc(source: B, crc: any): void;
    readUuid(source: B): UUID;
    readStringList(source: B): string[];
    readStringMap(source: B): {
        [key: string]: string;
    };
    readStringMultimap(source: B): {
        [key: string]: string[];
    };
    readBytesMap(source: B): {
        [key: string]: Uint8Array;
    };
    readInet(source: B): InetSocketAddress;
    abstract writeByte(b: number, dest: B): void;
    abstract writeInt(i: number, dest: B): void;
    abstract writeInetAddr(address: InetAddress, dest: B): void;
    abstract writeLong(l: Long, dest: B): void;
    abstract writeUnsignedShort(i: number, dest: B): void;
    abstract writeString(s: string, dest: B): void;
    abstract writeLongString(s: string, dest: B): void;
    writeUuid(uuid: UUID, dest: B): void;
    abstract writeBytes(bytes: Uint8Array, dest: B): void;
    abstract writeShortBytes(bytes: number[], dest: B): void;
    writeStringList(l: string[], dest: B): void;
    writeStringMap(m: {
        [key: string]: string;
    }, dest: B): void;
    writeStringMultimap(m: {
        [key: string]: string[];
    }, dest: B): void;
    writeBytesMap(m: {
        [key: string]: Uint8Array;
    }, dest: B): void;
    writeInet(address: InetSocketAddress, dest: B): void;
}
