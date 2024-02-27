import { Frame } from "./Frame";
import { FrameCodec } from "./FrameCodec";
import { PrimitiveCodec } from "./PrimitiveCodec";
import { Segment } from "./Segment";
export declare abstract class SegmentBuilder<B, StateT> {
    private primitiveCodec;
    private frameCodec;
    private maxPayloadLength;
    private currentPayloadFrames;
    private currentPayloadStates;
    private currentPayloadLength;
    protected constructor(primitiveCodec: PrimitiveCodec<B>, frameCodec: FrameCodec<B>, maxPayloadLength?: number);
    protected abstract mergeStates(frameStates: StateT[]): StateT;
    protected abstract splitState(frameState: StateT, sliceCount: number): StateT[];
    protected abstract processSegment(segment: Segment<B>, segmentState: StateT): void;
    addFrame(frame: Frame, frameState: StateT): void;
    flush(): void;
    protected onLargeFrameSplit(frame: Frame, frameLength: number, sliceCount: number): void;
    protected onSegmentFull(frame: Frame, frameLength: number, currentPayloadLength: number, currentFrameCount: number): void;
    protected onSmallFrameAdded(frame: Frame, frameLength: number, currentPayloadLength: number, currentFrameCount: number): void;
    protected onLastSegmentFlushed(currentPayloadLength: number, currentFrameCount: number): void;
    private processCurrentPayload;
    private resetCurrentPayload;
}
