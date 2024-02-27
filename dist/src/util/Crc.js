import { CRC32 } from "./CRC32";
export class Crc {
    static crc32 = new CRC32();
    static initialBytes = [0xfa, 0x2d, 0x55, 0xca];
    static computeCrc32(buffer, codec) {
        const crc = this.newCrc32();
        codec.updateCrc(buffer, crc);
        return crc.getValue();
    }
    static newCrc32() {
        const crc = this.crc32;
        crc.reset();
        crc.update(this.initialBytes);
        return crc;
    }
    static CRC24_INIT = 0x875060;
    static CRC24_POLY = 0x1974f0b;
    /**
     * NOTE: the order of bytes must reach the wire in the same order the CRC is computed, with the
     * CRC immediately following in a trailer. Since we read in least significant byte order, if you
     * write to a buffer using putInt or putLong, the byte order will be reversed and you will lose
     * the guarantee of protection from burst corruptions of 24 bits in length.
     *
     * Make sure either to write byte-by-byte to the wire, or to use Integer/Long.reverseBytes if
     * you write to a BIG_ENDIAN buffer.
     */
    static computeCrc24(bytes, len) {
        let crc = this.CRC24_INIT;
        while (len-- > 0) {
            crc ^= (bytes & 0xff) << 16;
            bytes >>= 8;
            for (let i = 0; i < 8; i++) {
                crc <<= 1;
                if ((crc & 0x1000000) !== 0)
                    crc ^= this.CRC24_POLY;
            }
        }
        return crc;
    }
}
