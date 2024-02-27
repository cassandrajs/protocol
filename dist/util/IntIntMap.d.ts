import { IntMap } from "./IntMap";
export declare class IntIntMap<V> {
    outer: IntMap<IntMap<V>>;
    static builder<V>(): IntIntMapBuilder<V>;
    constructor(outer: IntMap<IntMap<V>>);
    get(key1: number, key2: number): V;
}
export declare class IntIntMapBuilder<V> {
    private innerBuilders;
    put(key1: number, key2: number, value: V): IntIntMapBuilder<V>;
    build(): IntIntMap<V>;
}
