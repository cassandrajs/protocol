import { Compressor, HashMap } from "../../src";
import { MockBinaryString } from "./MockBinaryString";
export declare class MockCompressor extends Compressor<MockBinaryString> {
    decompressedToCompressed: HashMap<MockBinaryString, MockBinaryString>;
    compressedToDecompressed: HashMap<MockBinaryString, MockBinaryString>;
    algorithm: string;
    compress(uncompressed: any): MockBinaryString;
    decompress(compressed: any): MockBinaryString;
    compressWithoutLength(uncompressed: any): MockBinaryString;
    decompressWithoutLength(compressed: any, uncompressedLength: any): MockBinaryString;
    prime(decompressed: MockBinaryString, compressed: MockBinaryString): MockBinaryString;
}
