import { MockBinaryStringElement } from "./MockBinaryStringElement"

export type MockBinaryStringElementType =
	(typeof MockBinaryStringElement.Type)[keyof typeof MockBinaryStringElement.Type]
