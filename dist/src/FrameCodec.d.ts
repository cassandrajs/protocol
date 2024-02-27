import { CodecGroup } from "./CodecGroup";
import { Compressor } from "./Compressor";
import { Frame } from "./Frame";
import { PrimitiveCodec } from "./PrimitiveCodec";
import { ProtocolMessageCodec } from "./ProtocolMessageCodec";
import { IntIntMap } from "./util/IntIntMap";
export declare class FrameCodec<B> {
    /**
     * The header size for protocol v3 and above. Currently, it is the same for all supported protocol
     * versions.
     *
     * <p>If you have a reference to an instance of this class, {@link #encodedHeaderSize(Frame)} is a
     * more future-proof way to get this information.
     */
    static V3_ENCODED_HEADER_SIZE: number;
    /**
     * Builds a new instance with the default codecs for a client (encoding requests, decoding
     * responses).
     */
    static defaultClient<B>(primitiveCodec: PrimitiveCodec<B>, compressor: Compressor<B>): FrameCodec<B>;
    /**
     * Builds a new instance with the default codecs for a server (decoding requests, encoding
     * responses).
     */
    static defaultServer<B>(primitiveCodec: PrimitiveCodec<B>, compressor: Compressor<B>): FrameCodec<B>;
    primitiveCodec: PrimitiveCodec<B>;
    compressor: Compressor<B>;
    encoders: IntIntMap<ProtocolMessageCodec>;
    decoders: IntIntMap<ProtocolMessageCodec>;
    constructor(primitiveCodec: PrimitiveCodec<B>, compressor: Compressor<B>, ...codecGroups: CodecGroup[]);
    encode(frame: Frame): B;
    /**
     * Encodes the given frame into an existing buffer.
     *
     * <p>Note that this method never compresses the frame body; it is intended for protocol v5+,
     * where multiple frames are concatenated into a single buffer and compressed together, instead of
     * individually.
     *
     * <p>The caller is responsible for ensuring that the buffer has enough space remaining, that is:
     * {@link #encodedHeaderSize(Frame)} + {@link #encodedBodySize(Frame)} bytes.
     *
     * @param bodySize the body size to use in the header, if available. This is just an optimization
     *     because the caller may already know it if it has performed the size check above. If not,
     *     pass a negative value, and it will be recomputed.
     */
    encodeInto(frame: Frame, bodySize: number, dest: B, flags?: any, encoder?: ProtocolMessageCodec): any;
    private getMessageEncoder;
    private computeFlags;
    private encodeHeaderInto;
    private encodeBodyInto;
    private encodeTracingId;
    private encodeCustomPayload;
    private encodeWarnings;
    encodedHeaderSize(frame?: Frame): number;
    encodedBodySize(frame: Frame): number;
    decodeBodySize(source: B): number;
    decode(source: B): Frame;
    private readStreamId;
}
