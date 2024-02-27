export class InetSocketAddress {
    address;
    port;
    constructor(address, port) {
        this.address = address;
        this.port = port;
    }
    getAddress() {
        return this.address;
    }
    getPort() {
        return this.port;
    }
}
