import { Result } from "../Result";
import { RowsMetadata } from "./RowsMetadata";
export declare abstract class Rows extends Result {
    abstract getMetadata(): RowsMetadata;
    abstract getData(): Uint8Array[][];
    protected constructor();
}
