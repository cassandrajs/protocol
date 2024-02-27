import { PrimitiveCodec } from "../../PrimitiveCodec";
export declare class Values {
    static writePositionalValues<B>(values: Array<Uint8Array>, dest: B, encoder: PrimitiveCodec<B>): void;
    static sizeOfPositionalValues(values: Array<Uint8Array>): number;
    static writeNamedValues<B>(values: {
        [key: string]: Uint8Array;
    }, dest: B, encoder: PrimitiveCodec<B>): void;
    static sizeOfNamedValues(values: {
        [key: string]: Uint8Array;
    }): number;
    private static writeValue;
    private static sizeOfValue;
    static readPositionalValues<B>(source: B, decoder: PrimitiveCodec<B>): Array<Uint8Array>;
    static readNamedValues<B>(source: B, decoder: PrimitiveCodec<B>): {
        [key: string]: Uint8Array;
    };
    static readValue<B>(source: B, decoder: PrimitiveCodec<B>): Uint8Array;
}
