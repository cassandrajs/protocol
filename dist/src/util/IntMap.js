import { IllegalArgumentError } from "../errors/IllegalArgumentError";
import { HashMap } from "./HashMap";
export class IntMap {
    static builder() {
        return new IntMapBuilder();
    }
    values;
    constructor(entries = []) {
        let maxKey = -1;
        for (const entry of entries) {
            maxKey = Math.max(maxKey, entry[0]);
        }
        this.values = [];
        for (const entry of entries) {
            this.values[entry[0]] = entry[1];
        }
    }
    get(key) {
        if (key < 0) {
            throw new IllegalArgumentError("key must be positive");
        }
        if (key >= this.values.length) {
            return null;
        }
        else {
            return this.values[key];
        }
    }
    set(key, value) {
        this.values[key] = value;
        return value;
    }
}
export class IntMapBuilder {
    map = new HashMap();
    put(key, value) {
        if (key < 0) {
            throw new IllegalArgumentError("key must be positive: " + key);
        }
        if (this.map.containsKey(key)) {
            throw new IllegalArgumentError("key already exists: " + key);
        }
        this.map.put(key, value);
        return this;
    }
    build() {
        return new IntMap(this.map.entrySet());
    }
}
