export declare class IntMap<V> {
    static builder<V>(): IntMapBuilder<V>;
    private values;
    constructor(entries?: [number, V][]);
    get(key: number): V;
    set(key: number, value: V): V;
}
export declare class IntMapBuilder<V> {
    private map;
    put(key: number, value: V): IntMapBuilder<V>;
    build(): IntMap<V>;
}
