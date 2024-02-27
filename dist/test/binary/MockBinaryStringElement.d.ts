import { MockBinaryStringElementType } from "./MockBinaryStringElementType";
export declare class MockBinaryStringElement {
    static Type: {
        BYTE: number;
        INT: number;
        INET: number;
        INETADDR: number;
        LONG: number;
        UNSIGNED_SHORT: number;
        STRING: number;
        LONG_STRING: number;
        BYTES: number;
        SHORT_BYTES: number;
    };
    type: MockBinaryStringElementType;
    value: any;
    constructor(type: MockBinaryStringElementType, value: any);
    size(): number;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
}
