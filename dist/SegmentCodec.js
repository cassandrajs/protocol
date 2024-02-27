import Long from "long";
import { NoopCompressor } from "./NoopCompressor";
import { Segment } from "./Segment";
import { Crc } from "./util/Crc";
export class SegmentCodec {
    static COMPRESSED_HEADER_LENGTH = 5;
    static UNCOMPRESSED_HEADER_LENGTH = 3;
    static CRC24_LENGTH = 3;
    static CRC32_LENGTH = 4;
    primitiveCodec;
    compressor;
    compress;
    constructor(primitiveCodec, compressor) {
        this.primitiveCodec = primitiveCodec;
        this.compressor = compressor;
        this.compress = !(compressor instanceof NoopCompressor);
    }
    headerLength() {
        return this.compress
            ? SegmentCodec.COMPRESSED_HEADER_LENGTH
            : SegmentCodec.UNCOMPRESSED_HEADER_LENGTH;
    }
    encode(segment, out) {
        const uncompressedPayload = segment.payload;
        let uncompressedPayloadLength = this.primitiveCodec.sizeOf(uncompressedPayload);
        if (uncompressedPayloadLength > Segment.MAX_PAYLOAD_LENGTH) {
            throw new Error("Uncompressed payload length exceeds maximum allowed");
        }
        let encodedPayload;
        if (this.compress) {
            this.primitiveCodec.markReaderIndex(uncompressedPayload);
            const compressedPayload = this.compressor.compressWithoutLength(uncompressedPayload);
            if (this.primitiveCodec.sizeOf(compressedPayload) >=
                uncompressedPayloadLength) {
                this.primitiveCodec.resetReaderIndex(uncompressedPayload);
                encodedPayload = uncompressedPayload;
                this.primitiveCodec.release(compressedPayload);
                uncompressedPayloadLength = 0;
            }
            else {
                encodedPayload = compressedPayload;
                this.primitiveCodec.release(uncompressedPayload);
            }
        }
        else {
            encodedPayload = uncompressedPayload;
        }
        const payloadLength = this.primitiveCodec.sizeOf(encodedPayload);
        const header = this.encodeHeader(payloadLength, uncompressedPayloadLength, segment.isSelfContained);
        let payloadCrc = Crc.computeCrc32(encodedPayload, this.primitiveCodec);
        const trailer = this.primitiveCodec.allocate(SegmentCodec.CRC32_LENGTH);
        for (let i = 0; i < SegmentCodec.CRC32_LENGTH; i++) {
            this.primitiveCodec.writeByte(payloadCrc.and(0xff).toInt(), trailer);
            payloadCrc = payloadCrc.shiftRight(8);
        }
        out.push(header);
        out.push(encodedPayload);
        out.push(trailer);
    }
    encodeHeader(payloadLength, uncompressedLength, isSelfContained) {
        if (payloadLength > Segment.MAX_PAYLOAD_LENGTH) {
            throw new Error("Payload length exceeds maximum allowed");
        }
        let headerLength = this.headerLength();
        let headerData = payloadLength;
        let flagOffset = 17;
        if (this.compress) {
            headerData |= uncompressedLength << 17;
            flagOffset += 17;
        }
        if (isSelfContained) {
            headerData |= 1 << flagOffset;
        }
        const headerCrc = Crc.computeCrc24(headerData, headerLength);
        const header = this.primitiveCodec.allocate(headerLength + SegmentCodec.CRC24_LENGTH);
        for (let i = 0; i < headerLength; i++) {
            const shift = i * 8;
            this.primitiveCodec.writeByte((headerData >> shift) & 0xff, header);
        }
        for (let i = 0; i < SegmentCodec.CRC24_LENGTH; i++) {
            const shift = i * 8;
            this.primitiveCodec.writeByte((headerCrc >> shift) & 0xff, header);
        }
        return header;
    }
    decodeHeader(source) {
        const headerLength = this.headerLength();
        if (this.primitiveCodec.sizeOf(source) <
            headerLength + SegmentCodec.CRC24_LENGTH) {
            throw new Error("Not enough bytes to decode header");
        }
        let headerData = 0;
        for (let i = 0; i < headerLength; i++) {
            headerData |= this.primitiveCodec.readByte(source) << (8 * i);
        }
        let expectedHeaderCrc = 0;
        for (let i = 0; i < SegmentCodec.CRC24_LENGTH; i++) {
            expectedHeaderCrc |= this.primitiveCodec.readByte(source) << (8 * i);
        }
        const actualHeaderCrc = Crc.computeCrc24(headerData, headerLength);
        if (actualHeaderCrc !== expectedHeaderCrc) {
            throw new Error("CRC mismatch on header.");
        }
        let payloadLength = headerData & Segment.MAX_PAYLOAD_LENGTH;
        headerData >>= 17;
        let uncompressedPayloadLength = this.compress
            ? headerData & Segment.MAX_PAYLOAD_LENGTH
            : -1;
        let isSelfContained = (headerData & 1) === 1;
        return new Header(payloadLength, uncompressedPayloadLength, isSelfContained);
    }
    decode(header, source) {
        if (this.primitiveCodec.sizeOf(source) !==
            header.payloadLength + SegmentCodec.CRC32_LENGTH) {
            throw new Error("Invalid source size for decoding payload");
        }
        const encodedPayload = this.primitiveCodec.readRetainedSlice(source, header.payloadLength);
        let expectedPayloadCrc = Long.ZERO;
        for (let i = 0; i < SegmentCodec.CRC32_LENGTH; i++) {
            let value = Long.fromNumber(this.primitiveCodec.readByte(source)); // Ensure you're working with Long
            value = value.shiftLeft(8 * i); // Shift left
            expectedPayloadCrc = expectedPayloadCrc.or(value); // Combine with OR
        }
        this.primitiveCodec.release(source);
        const actualPayloadCrc = Crc.computeCrc32(encodedPayload, this.primitiveCodec);
        if (actualPayloadCrc !== expectedPayloadCrc) {
            this.primitiveCodec.release(encodedPayload);
            throw new Error("CRC mismatch on payload");
        }
        let payload;
        if (this.compress && header.uncompressedPayloadLength > 0) {
            payload = this.compressor.decompressWithoutLength(encodedPayload, header.uncompressedPayloadLength);
            this.primitiveCodec.release(encodedPayload);
        }
        else {
            payload = encodedPayload;
        }
        return new Segment(payload, header.isSelfContained);
    }
}
export class Header {
    payloadLength;
    uncompressedPayloadLength;
    isSelfContained;
    constructor(payloadLength, uncompressedPayloadLength, isSelfContained) {
        this.payloadLength = payloadLength;
        this.uncompressedPayloadLength = uncompressedPayloadLength;
        this.isSelfContained = isSelfContained;
    }
}
