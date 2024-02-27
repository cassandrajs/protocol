import { Frame } from "./Frame"
import { FrameCodec } from "./FrameCodec"
import { PrimitiveCodec } from "./PrimitiveCodec"
import { Segment } from "./Segment"

export abstract class SegmentBuilder<B, StateT> {
	private primitiveCodec: PrimitiveCodec<B>
	private frameCodec: FrameCodec<B>
	private maxPayloadLength: number

	private currentPayloadFrames: Frame[] = []
	private currentPayloadStates: StateT[] = []
	private currentPayloadLength: number = 0

	protected constructor(
		primitiveCodec: PrimitiveCodec<B>,
		frameCodec: FrameCodec<B>,
		maxPayloadLength: number = Segment.MAX_PAYLOAD_LENGTH
	) {
		this.primitiveCodec = primitiveCodec
		this.frameCodec = frameCodec
		this.maxPayloadLength = maxPayloadLength
	}

	protected abstract mergeStates(frameStates: StateT[]): StateT

	protected abstract splitState(
		frameState: StateT,
		sliceCount: number
	): StateT[]

	protected abstract processSegment(
		segment: Segment<B>,
		segmentState: StateT
	): void

	public addFrame(frame: Frame, frameState: StateT): void {
		const frameBodyLength = this.frameCodec.encodedBodySize(frame)
		const frameLength =
			this.frameCodec.encodedHeaderSize(frame) + frameBodyLength

		if (frameLength > this.maxPayloadLength) {
			const frameBuffer = this.primitiveCodec.allocate(frameLength)
			this.frameCodec.encodeInto(frame, frameBodyLength, frameBuffer)
			const isExactMultiple = frameLength % this.maxPayloadLength === 0
			const sliceCount =
				Math.floor(frameLength / this.maxPayloadLength) +
				(isExactMultiple ? 0 : 1)
			this.onLargeFrameSplit(frame, frameLength, sliceCount)

			const sliceStates = this.splitState(frameState, sliceCount)

			for (let i = 0; i < sliceCount; i++) {
				const sliceLength =
					i < sliceCount - 1 || isExactMultiple
						? this.maxPayloadLength
						: frameLength % this.maxPayloadLength
				const slicePayload = this.primitiveCodec.readRetainedSlice(
					frameBuffer,
					sliceLength
				)
				this.processSegment(new Segment(slicePayload, false), sliceStates[i])
			}

			this.primitiveCodec.release(frameBuffer)
		} else {
			if (this.currentPayloadLength + frameLength > this.maxPayloadLength) {
				this.onSegmentFull(
					frame,
					frameLength,
					this.currentPayloadLength,
					this.currentPayloadFrames.length
				)
				this.processCurrentPayload()
				this.resetCurrentPayload()
			}

			this.currentPayloadFrames.push(frame)
			this.currentPayloadStates.push(frameState)
			this.currentPayloadLength += frameLength
			this.onSmallFrameAdded(
				frame,
				frameLength,
				this.currentPayloadLength,
				this.currentPayloadFrames.length
			)
		}
	}

	public flush(): void {
		if (this.currentPayloadFrames.length !== 0) {
			this.onLastSegmentFlushed(
				this.currentPayloadLength,
				this.currentPayloadFrames.length
			)
			this.processCurrentPayload()
			this.resetCurrentPayload()
		}
	}

	protected onLargeFrameSplit(
		frame: Frame,
		frameLength: number,
		sliceCount: number
	): void {}

	protected onSegmentFull(
		frame: Frame,
		frameLength: number,
		currentPayloadLength: number,
		currentFrameCount: number
	): void {}

	protected onSmallFrameAdded(
		frame: Frame,
		frameLength: number,
		currentPayloadLength: number,
		currentFrameCount: number
	): void {}

	protected onLastSegmentFlushed(
		currentPayloadLength: number,
		currentFrameCount: number
	): void {}

	private processCurrentPayload(): void {
		const payload = this.primitiveCodec.allocate(this.currentPayloadLength)
		this.currentPayloadFrames.forEach((frame) => {
			this.frameCodec.encodeInto(frame, -1, payload)
		})

		const state = this.mergeStates(this.currentPayloadStates)
		this.processSegment(new Segment(payload, true), state)
	}

	private resetCurrentPayload(): void {
		this.currentPayloadFrames = []
		this.currentPayloadStates = []
		this.currentPayloadLength = 0
	}
}
