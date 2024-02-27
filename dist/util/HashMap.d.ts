export declare class HashMap<K, V> {
    keyToValSet: {
        [key: number]: {
            val: V;
            hash: number;
        };
    };
    valToKeySet: {
        [key: number]: {
            val: K;
            hash: number;
        };
    };
    constructor(values?: [K, V][]);
    containsKey(key: K): boolean;
    get(key: K): V | null;
    getOrDefault(key: K, defaultValue: V): V;
    isEmpty(): boolean;
    put(key: K, value: V): V;
    putAll(m: [K, V][]): void;
    putIfAbsent(key: K, value: V): V;
    remove(key: K, value?: V): V | null;
    replace(key: K, value: V): V | null;
    replaceIf(key: K, oldValue: V, newValue: V): V | null;
    clear(): void;
    size(): number;
    keySet(): K[];
    values(): V[];
    entrySet(): [K, V][];
    computeIfAbsent(key: K, mappingFunction: (key: K) => V): V | null;
    computeIfPresent(key: K, remappingFunction: (key: K, value: V) => V): V | null;
}
