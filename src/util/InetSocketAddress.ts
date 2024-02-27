import { InetAddress } from "./InetAddress"

export class InetSocketAddress {
	address: InetAddress
	port: number

	constructor(address: InetAddress, port: number) {
		this.address = address
		this.port = port
	}

	getAddress(): InetAddress {
		return this.address
	}

	getPort(): number {
		return this.port
	}
}
