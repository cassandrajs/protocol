import { InetSocketAddress } from "./util/InetSocketAddress";
import { UUID } from "./util/UUID";
export class PrimitiveCodec {
    readUuid(source) {
        const msb = this.readLong(source);
        const lsb = this.readLong(source);
        return new UUID(msb, lsb);
    }
    readStringList(source) {
        const size = this.readUnsignedShort(source);
        if (size == 0)
            return [];
        const result = [];
        for (let i = 0; i < size; i++) {
            result.push(this.readString(source));
        }
        return result;
    }
    readStringMap(source) {
        const size = this.readUnsignedShort(source);
        if (size == 0)
            return {};
        const result = {};
        for (let i = 0; i < size; i++) {
            result[this.readString(source)] = this.readString(source);
        }
        return result;
    }
    readStringMultimap(source) {
        const size = this.readUnsignedShort(source);
        if (size == 0)
            return {};
        const result = {};
        for (let i = 0; i < size; i++) {
            result[this.readString(source)] = this.readStringList(source);
        }
        return result;
    }
    readBytesMap(source) {
        const size = this.readUnsignedShort(source);
        if (size == 0)
            return {};
        const result = {};
        for (let i = 0; i < size; i++) {
            result[this.readString(source)] = this.readBytes(source);
        }
        return result;
    }
    readInet(source) {
        return new InetSocketAddress(this.readInetAddr(source), this.readInt(source));
    }
    writeUuid(uuid, dest) {
        this.writeLong(uuid.getMostSignificantBits(), dest);
        this.writeLong(uuid.getLeastSignificantBits(), dest);
    }
    writeStringList(l, dest) {
        this.writeUnsignedShort(l.length, dest);
        for (let s of l) {
            this.writeString(s, dest);
        }
    }
    writeStringMap(m, dest) {
        const entries = Object.entries(m);
        this.writeUnsignedShort(entries.length, dest);
        for (let s of entries) {
            this.writeString(s[0], dest);
            this.writeString(s[1], dest);
        }
    }
    writeStringMultimap(m, dest) {
        const entries = Object.entries(m);
        this.writeUnsignedShort(entries.length, dest);
        for (let s of entries) {
            this.writeString(s[0], dest);
            this.writeStringList(s[1], dest);
        }
    }
    writeBytesMap(m, dest) {
        const entries = Object.entries(m);
        this.writeUnsignedShort(entries.length, dest);
        for (let s of entries) {
            this.writeString(s[0], dest);
            this.writeBytes(s[1], dest);
        }
    }
    writeInet(address, dest) {
        this.writeInetAddr(address.getAddress(), dest);
        this.writeInt(address.getPort(), dest);
    }
}
