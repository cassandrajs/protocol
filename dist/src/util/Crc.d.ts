import Long from "long";
import { PrimitiveCodec } from "../PrimitiveCodec";
export declare class Crc {
    private static crc32;
    private static initialBytes;
    static computeCrc32<B>(buffer: B, codec: PrimitiveCodec<B>): Long;
    private static newCrc32;
    private static CRC24_INIT;
    private static CRC24_POLY;
    /**
     * NOTE: the order of bytes must reach the wire in the same order the CRC is computed, with the
     * CRC immediately following in a trailer. Since we read in least significant byte order, if you
     * write to a buffer using putInt or putLong, the byte order will be reversed and you will lose
     * the guarantee of protection from burst corruptions of 24 bits in length.
     *
     * Make sure either to write byte-by-byte to the wire, or to use Integer/Long.reverseBytes if
     * you write to a BIG_ENDIAN buffer.
     */
    static computeCrc24(bytes: number, len: number): number;
}
