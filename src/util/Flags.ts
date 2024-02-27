export class Flags {
	static contains(flags: number, mask: number): boolean {
		return (flags & mask) == mask
	}

	static add(flags: number, mask: number): number {
		return flags | mask
	}
}
