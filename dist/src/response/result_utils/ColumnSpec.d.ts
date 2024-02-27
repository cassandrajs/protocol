import { RawType } from "./RawType";
export declare class ColumnSpec {
    ksName: string;
    tableName: string;
    name: string;
    index: number;
    type: RawType;
    constructor(ksName: string, tableName: string, name: string, index: number, type: RawType);
    equals(other: any): boolean;
    hashCode(): number;
}
