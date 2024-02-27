import { PrimitiveCodec } from "../../PrimitiveCodec"
import { PrimitiveSizes } from "../../PrimitiveSizes"
import { ProtocolMessage } from "../../ProtocolMessage"
import { InetSocketAddress } from "../../util/InetSocketAddress"
import {
	ProtocolConstants,
	ProtocolVersion,
} from "../../util/ProtocolConstants"
import { ProtocolEvent, ProtocolEventSubCodec } from "../ProtocolEvent"

export class StatusChangeEvent extends ProtocolEvent {
	changeType: string
	address: InetSocketAddress

	constructor(changeType: string, address: InetSocketAddress) {
		super(ProtocolConstants.EventType.STATUS_CHANGE)
		this.changeType = changeType
		this.address = address
	}

	toString(): string {
		return `EVENT STATUS_CHANGE(${this.changeType} ${this.address})`
	}

	static SubCodec = class extends ProtocolEventSubCodec {
		constructor(protocolVersion: ProtocolVersion | string) {
			super(
				ProtocolConstants.EventType.STATUS_CHANGE,
				protocolVersion as ProtocolVersion
			)
		}

		encode<B>(
			dest: B,
			message: ProtocolMessage,
			encoder: PrimitiveCodec<B>
		): void {
			const event = message as StatusChangeEvent
			encoder.writeString(event.changeType, dest)
			encoder.writeInet(event.address, dest)
		}

		encodedSize(message: ProtocolMessage): number {
			const event = message as StatusChangeEvent
			return (
				PrimitiveSizes.sizeOfString(event.changeType) +
				PrimitiveSizes.sizeOfInet(event.address)
			)
		}

		decode<B>(source: B, decoder: PrimitiveCodec<B>): ProtocolMessage {
			const changeType = decoder.readString(source)
			const address = decoder.readInet(source)
			return new StatusChangeEvent(changeType, address)
		}
	}
}
