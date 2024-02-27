export class Segment<B> {
	public static MAX_PAYLOAD_LENGTH: number = 128 * 1024 - 1

	payload: B
	isSelfContained: boolean

	constructor(payload: B, isSelfContained: boolean) {
		this.payload = payload
		this.isSelfContained = isSelfContained
	}
}
