export class Character {
	static isHighSurrogate(codeUnit: number) {
		return codeUnit >= 0xd800 && codeUnit <= 0xdbff
	}

	static isLowSurrogate(codeUnit: number) {
		return codeUnit >= 0xdc00 && codeUnit <= 0xdfff
	}
}
