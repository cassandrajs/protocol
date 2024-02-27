import { Compressor } from "./Compressor";
import { PrimitiveCodec } from "./PrimitiveCodec";
import { Segment } from "./Segment";
export declare class SegmentCodec<B> {
    private static COMPRESSED_HEADER_LENGTH;
    private static UNCOMPRESSED_HEADER_LENGTH;
    static CRC24_LENGTH: number;
    static CRC32_LENGTH: number;
    private primitiveCodec;
    private compressor;
    private compress;
    constructor(primitiveCodec: PrimitiveCodec<B>, compressor: Compressor<B>);
    headerLength(): number;
    encode(segment: Segment<B>, out: Array<Object>): void;
    encodeHeader(payloadLength: number, uncompressedLength: number, isSelfContained: boolean): B;
    decodeHeader(source: B): Header;
    decode(header: Header, source: B): Segment<B>;
}
export declare class Header {
    payloadLength: number;
    uncompressedPayloadLength: number;
    isSelfContained: boolean;
    constructor(payloadLength: number, uncompressedPayloadLength: number, isSelfContained: boolean);
}
