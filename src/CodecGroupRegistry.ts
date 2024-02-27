import { ProtocolMessageCodec } from "./ProtocolMessageCodec"

export interface CodecGroupRegistry {
	addCodec(codec: ProtocolMessageCodec): CodecGroupRegistry

	/**
	 * Add a codec for encoding only; this helps catch programming errors if the client is only
	 * supposed to send a subset of the existing messages.
	 */
	addEncoder(codec: ProtocolMessageCodec): CodecGroupRegistry

	/**
	 * Add a codec for decoding only; this helps catch programming errors if the client is only
	 * supposed to receive a subset of the existing messages.
	 */
	addDecoder(codec: ProtocolMessageCodec): CodecGroupRegistry
}
