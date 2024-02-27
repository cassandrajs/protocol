export class Flags {
    static contains(flags, mask) {
        return (flags & mask) == mask;
    }
    static add(flags, mask) {
        return flags | mask;
    }
}
