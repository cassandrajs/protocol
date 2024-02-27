import { HashMap } from "./HashMap";
import { IntMap } from "./IntMap";
export class IntIntMap {
    outer;
    static builder() {
        return new IntIntMapBuilder();
    }
    constructor(outer) {
        this.outer = outer;
    }
    get(key1, key2) {
        const inner = this.outer.get(key1);
        return inner == null ? null : inner.get(key2);
    }
}
export class IntIntMapBuilder {
    innerBuilders = new HashMap();
    put(key1, key2, value) {
        this.innerBuilders
            .computeIfAbsent(key1, (k) => IntMap.builder())
            .put(key2, value);
        return this;
    }
    build() {
        const outerBuilder = IntMap.builder();
        for (const entry of this.innerBuilders.entrySet()) {
            outerBuilder.put(entry[0], entry[1].build());
        }
        return new IntIntMap(outerBuilder.build());
    }
}
