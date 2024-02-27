import { Opcode } from "./util/ProtocolConstants"

export class ProtocolMessage {
	isResponse: boolean
	opcode: Opcode

	constructor(isResponse: boolean, opcode: Opcode) {
		this.isResponse = isResponse
		this.opcode = opcode
	}
}
