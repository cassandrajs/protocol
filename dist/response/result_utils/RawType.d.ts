import { PrimitiveCodec } from "../../PrimitiveCodec";
import { ProtocolVersion } from "../../util/ProtocolConstants";
export declare class ARawType {
    id: number;
    protected constructor(id: number);
    static decode<B>(source: B, decoder: PrimitiveCodec<B>, protocolVersion: number): RawType;
    encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: number): void;
    encodedSize(protocolVersion: number): number;
    equals(other: RawType): boolean;
    hashCode(): number;
}
declare class TheRawPrimitive extends ARawType {
    constructor(id: number);
    encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: number): void;
    encodedSize(protocolVersion: number): number;
}
export declare class RawType extends ARawType {
    static decode<B>(source: B, decoder: PrimitiveCodec<B>, protocolVersion: number): RawType;
    encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: number): void;
    encodedSize(protocolVersion: number): number;
    static RawPrimitive: typeof TheRawPrimitive;
    static RawCustom: {
        new (className: string): {
            className: string;
            encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: number): void;
            encodedSize(protocolVersion: number): number;
            equals(o: any): boolean;
            hashCode(): number;
            id: number;
        };
        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
        RawPrimitive: typeof TheRawPrimitive;
        RawCustom: any;
        RawList: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawSet: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawMap: {
            new (keyType: RawType, valueType: RawType): {
                keyType: RawType;
                valueType: RawType;
                encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawUdt: {
            new (keyspace: string, typeName: string, fields: {
                [key: string]: RawType;
            }): {
                keyspace: string;
                typeName: string;
                fields: {
                    [key: string]: RawType;
                };
                encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                fieldsEqual(otherFields: {
                    [key: string]: RawType;
                }): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawTuple: {
            new (fieldTypes: RawType[]): {
                fieldTypes: RawType[];
                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: any;
        };
    };
    static RawList: {
        new (elementType: RawType): {
            elementType: RawType;
            encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: number): void;
            encodedSize(protocolVersion: number): number;
            equals(o: any): boolean;
            hashCode(): number;
            id: number;
        };
        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
        RawPrimitive: typeof TheRawPrimitive;
        RawCustom: {
            new (className: string): {
                className: string;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawList: any;
        RawSet: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawMap: {
            new (keyType: RawType, valueType: RawType): {
                keyType: RawType;
                valueType: RawType;
                encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawUdt: {
            new (keyspace: string, typeName: string, fields: {
                [key: string]: RawType;
            }): {
                keyspace: string;
                typeName: string;
                fields: {
                    [key: string]: RawType;
                };
                encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                fieldsEqual(otherFields: {
                    [key: string]: RawType;
                }): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawTuple: {
            new (fieldTypes: RawType[]): {
                fieldTypes: RawType[];
                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: any;
        };
    };
    static RawSet: {
        new (elementType: RawType): {
            elementType: RawType;
            encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: ProtocolVersion): void;
            encodedSize(protocolVersion: ProtocolVersion): number;
            equals(o: any): boolean;
            hashCode(): number;
            id: number;
        };
        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
        RawPrimitive: typeof TheRawPrimitive;
        RawCustom: {
            new (className: string): {
                className: string;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawList: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawSet: any;
        RawMap: {
            new (keyType: RawType, valueType: RawType): {
                keyType: RawType;
                valueType: RawType;
                encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawUdt: {
            new (keyspace: string, typeName: string, fields: {
                [key: string]: RawType;
            }): {
                keyspace: string;
                typeName: string;
                fields: {
                    [key: string]: RawType;
                };
                encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                fieldsEqual(otherFields: {
                    [key: string]: RawType;
                }): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawTuple: {
            new (fieldTypes: RawType[]): {
                fieldTypes: RawType[];
                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: any;
        };
    };
    static RawMap: {
        new (keyType: RawType, valueType: RawType): {
            keyType: RawType;
            valueType: RawType;
            encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: number): void;
            encodedSize(protocolVersion: number): number;
            equals(o: any): boolean;
            hashCode(): number;
            id: number;
        };
        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
        RawPrimitive: typeof TheRawPrimitive;
        RawCustom: {
            new (className: string): {
                className: string;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawList: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawSet: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawMap: any;
        RawUdt: {
            new (keyspace: string, typeName: string, fields: {
                [key: string]: RawType;
            }): {
                keyspace: string;
                typeName: string;
                fields: {
                    [key: string]: RawType;
                };
                encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                fieldsEqual(otherFields: {
                    [key: string]: RawType;
                }): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawTuple: {
            new (fieldTypes: RawType[]): {
                fieldTypes: RawType[];
                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: any;
        };
    };
    static RawUdt: {
        new (keyspace: string, typeName: string, fields: {
            [key: string]: RawType;
        }): {
            keyspace: string;
            typeName: string;
            fields: {
                [key: string]: RawType;
            };
            encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: ProtocolVersion): void;
            encodedSize(protocolVersion: ProtocolVersion): number;
            equals(o: any): boolean;
            fieldsEqual(otherFields: {
                [key: string]: RawType;
            }): boolean;
            hashCode(): number;
            id: number;
        };
        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
        RawPrimitive: typeof TheRawPrimitive;
        RawCustom: {
            new (className: string): {
                className: string;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawList: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawSet: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawMap: {
            new (keyType: RawType, valueType: RawType): {
                keyType: RawType;
                valueType: RawType;
                encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawUdt: any;
        RawTuple: {
            new (fieldTypes: RawType[]): {
                fieldTypes: RawType[];
                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: any;
        };
    };
    static RawTuple: {
        new (fieldTypes: RawType[]): {
            fieldTypes: RawType[];
            encode<B>(dest: B, encoder: PrimitiveCodec<B>, protocolVersion: ProtocolVersion): void;
            encodedSize(protocolVersion: ProtocolVersion): number;
            equals(o: any): boolean;
            hashCode(): number;
            id: number;
        };
        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
        RawPrimitive: typeof TheRawPrimitive;
        RawCustom: {
            new (className: string): {
                className: string;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawList: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_2>(dest: B_2, encoder: PrimitiveCodec<B_2>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: {
                new (elementType: RawType): {
                    elementType: RawType;
                    encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: {
                    new (keyType: RawType, valueType: RawType): {
                        keyType: RawType;
                        valueType: RawType;
                        encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                        encodedSize(protocolVersion: number): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: {
                        new (keyspace: string, typeName: string, fields: {
                            [key: string]: RawType;
                        }): {
                            keyspace: string;
                            typeName: string;
                            fields: {
                                [key: string]: RawType;
                            };
                            encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            fieldsEqual(otherFields: {
                                [key: string]: RawType;
                            }): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: {
                            new (fieldTypes: RawType[]): {
                                fieldTypes: RawType[];
                                encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                                encodedSize(protocolVersion: ProtocolVersion): number;
                                equals(o: any): boolean;
                                hashCode(): number;
                                id: number;
                            };
                            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                            RawPrimitive: typeof TheRawPrimitive;
                            RawCustom: any;
                            RawList: any;
                            RawSet: any;
                            RawMap: any;
                            RawUdt: any;
                            RawTuple: any;
                        };
                    };
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawSet: {
            new (elementType: RawType): {
                elementType: RawType;
                encode<B_3>(dest: B_3, encoder: PrimitiveCodec<B_3>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: {
                new (keyType: RawType, valueType: RawType): {
                    keyType: RawType;
                    valueType: RawType;
                    encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                    encodedSize(protocolVersion: number): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: {
                    new (keyspace: string, typeName: string, fields: {
                        [key: string]: RawType;
                    }): {
                        keyspace: string;
                        typeName: string;
                        fields: {
                            [key: string]: RawType;
                        };
                        encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        fieldsEqual(otherFields: {
                            [key: string]: RawType;
                        }): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: {
                        new (fieldTypes: RawType[]): {
                            fieldTypes: RawType[];
                            encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                            encodedSize(protocolVersion: ProtocolVersion): number;
                            equals(o: any): boolean;
                            hashCode(): number;
                            id: number;
                        };
                        decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                        RawPrimitive: typeof TheRawPrimitive;
                        RawCustom: any;
                        RawList: any;
                        RawSet: any;
                        RawMap: any;
                        RawUdt: any;
                        RawTuple: any;
                    };
                };
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawMap: {
            new (keyType: RawType, valueType: RawType): {
                keyType: RawType;
                valueType: RawType;
                encode<B_4>(dest: B_4, encoder: PrimitiveCodec<B_4>, protocolVersion: number): void;
                encodedSize(protocolVersion: number): number;
                equals(o: any): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: {
                new (keyspace: string, typeName: string, fields: {
                    [key: string]: RawType;
                }): {
                    keyspace: string;
                    typeName: string;
                    fields: {
                        [key: string]: RawType;
                    };
                    encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    fieldsEqual(otherFields: {
                        [key: string]: RawType;
                    }): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: {
                    new (fieldTypes: RawType[]): {
                        fieldTypes: RawType[];
                        encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                        encodedSize(protocolVersion: ProtocolVersion): number;
                        equals(o: any): boolean;
                        hashCode(): number;
                        id: number;
                    };
                    decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                    RawPrimitive: typeof TheRawPrimitive;
                    RawCustom: any;
                    RawList: any;
                    RawSet: any;
                    RawMap: any;
                    RawUdt: any;
                    RawTuple: any;
                };
            };
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawUdt: {
            new (keyspace: string, typeName: string, fields: {
                [key: string]: RawType;
            }): {
                keyspace: string;
                typeName: string;
                fields: {
                    [key: string]: RawType;
                };
                encode<B_5>(dest: B_5, encoder: PrimitiveCodec<B_5>, protocolVersion: ProtocolVersion): void;
                encodedSize(protocolVersion: ProtocolVersion): number;
                equals(o: any): boolean;
                fieldsEqual(otherFields: {
                    [key: string]: RawType;
                }): boolean;
                hashCode(): number;
                id: number;
            };
            decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
            RawPrimitive: typeof TheRawPrimitive;
            RawCustom: any;
            RawList: any;
            RawSet: any;
            RawMap: any;
            RawUdt: any;
            RawTuple: {
                new (fieldTypes: RawType[]): {
                    fieldTypes: RawType[];
                    encode<B_6>(dest: B_6, encoder: PrimitiveCodec<B_6>, protocolVersion: ProtocolVersion): void;
                    encodedSize(protocolVersion: ProtocolVersion): number;
                    equals(o: any): boolean;
                    hashCode(): number;
                    id: number;
                };
                decode<B_1>(source: B_1, decoder: PrimitiveCodec<B_1>, protocolVersion: number): RawType;
                RawPrimitive: typeof TheRawPrimitive;
                RawCustom: any;
                RawList: any;
                RawSet: any;
                RawMap: any;
                RawUdt: any;
                RawTuple: any;
            };
        };
        RawTuple: any;
    };
}
export {};
