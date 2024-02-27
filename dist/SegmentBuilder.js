import { Segment } from "./Segment";
export class SegmentBuilder {
    primitiveCodec;
    frameCodec;
    maxPayloadLength;
    currentPayloadFrames = [];
    currentPayloadStates = [];
    currentPayloadLength = 0;
    constructor(primitiveCodec, frameCodec, maxPayloadLength = Segment.MAX_PAYLOAD_LENGTH) {
        this.primitiveCodec = primitiveCodec;
        this.frameCodec = frameCodec;
        this.maxPayloadLength = maxPayloadLength;
    }
    addFrame(frame, frameState) {
        const frameBodyLength = this.frameCodec.encodedBodySize(frame);
        const frameLength = this.frameCodec.encodedHeaderSize(frame) + frameBodyLength;
        if (frameLength > this.maxPayloadLength) {
            const frameBuffer = this.primitiveCodec.allocate(frameLength);
            this.frameCodec.encodeInto(frame, frameBodyLength, frameBuffer);
            const isExactMultiple = frameLength % this.maxPayloadLength === 0;
            const sliceCount = Math.floor(frameLength / this.maxPayloadLength) +
                (isExactMultiple ? 0 : 1);
            this.onLargeFrameSplit(frame, frameLength, sliceCount);
            const sliceStates = this.splitState(frameState, sliceCount);
            for (let i = 0; i < sliceCount; i++) {
                const sliceLength = i < sliceCount - 1 || isExactMultiple
                    ? this.maxPayloadLength
                    : frameLength % this.maxPayloadLength;
                const slicePayload = this.primitiveCodec.readRetainedSlice(frameBuffer, sliceLength);
                this.processSegment(new Segment(slicePayload, false), sliceStates[i]);
            }
            this.primitiveCodec.release(frameBuffer);
        }
        else {
            if (this.currentPayloadLength + frameLength > this.maxPayloadLength) {
                this.onSegmentFull(frame, frameLength, this.currentPayloadLength, this.currentPayloadFrames.length);
                this.processCurrentPayload();
                this.resetCurrentPayload();
            }
            this.currentPayloadFrames.push(frame);
            this.currentPayloadStates.push(frameState);
            this.currentPayloadLength += frameLength;
            this.onSmallFrameAdded(frame, frameLength, this.currentPayloadLength, this.currentPayloadFrames.length);
        }
    }
    flush() {
        if (this.currentPayloadFrames.length !== 0) {
            this.onLastSegmentFlushed(this.currentPayloadLength, this.currentPayloadFrames.length);
            this.processCurrentPayload();
            this.resetCurrentPayload();
        }
    }
    onLargeFrameSplit(frame, frameLength, sliceCount) { }
    onSegmentFull(frame, frameLength, currentPayloadLength, currentFrameCount) { }
    onSmallFrameAdded(frame, frameLength, currentPayloadLength, currentFrameCount) { }
    onLastSegmentFlushed(currentPayloadLength, currentFrameCount) { }
    processCurrentPayload() {
        const payload = this.primitiveCodec.allocate(this.currentPayloadLength);
        this.currentPayloadFrames.forEach((frame) => {
            this.frameCodec.encodeInto(frame, -1, payload);
        });
        const state = this.mergeStates(this.currentPayloadStates);
        this.processSegment(new Segment(payload, true), state);
    }
    resetCurrentPayload() {
        this.currentPayloadFrames = [];
        this.currentPayloadStates = [];
        this.currentPayloadLength = 0;
    }
}
