import { IllegalArgumentError } from "./errors/IllegalArgumentError"
import { ProtocolMessage } from "./ProtocolMessage"
import { UUID } from "./util/UUID"

type Payload = { [key: string]: Uint8Array }

export class Frame {
	static NO_PAYLOAD: Payload = {}

	static forRequest(
		protocolVersion: number,
		streamId: number,
		tracing: boolean,
		customPayload: Payload,
		message: ProtocolMessage
	) {
		return new Frame(
			protocolVersion,
			false,
			streamId,
			tracing,
			null,
			-1,
			-1,
			customPayload,
			[],
			message
		)
	}

	static forResponse(
		protocolVersion: number,
		streamId: number,
		tracingId: UUID,
		customPayload: Payload,
		message: ProtocolMessage
	) {
		return new Frame(
			protocolVersion,
			false,
			streamId,
			false,
			tracingId,
			-1,
			-1,
			customPayload,
			[],
			message
		)
	}

	protocolVersion: number
	beta: boolean
	streamId: number
	tracingId: UUID
	tracing: boolean
	size: number
	compressedSize: number
	customPayload: Payload
	warnings: string[]
	message: ProtocolMessage

	constructor(
		protocolVersion: number,
		beta: boolean,
		streamId: number,
		tracing: boolean,
		tracingId: UUID,
		size: number,
		compressedSize: number,
		customPayload: Payload,
		warnings: string[],
		message: ProtocolMessage
	) {
		if (!(Object.keys(customPayload).length == 0 || protocolVersion >= 4)) {
			throw new IllegalArgumentError("Custom payloads require protocol V4")
		}

		this.protocolVersion = protocolVersion
		this.beta = beta
		this.streamId = streamId
		this.tracingId = tracingId
		this.tracing = tracing
		this.size = size
		this.compressedSize = compressedSize
		this.customPayload = customPayload
		this.warnings = warnings
		this.message = message
	}
}
