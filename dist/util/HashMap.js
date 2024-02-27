import { HashObject } from "./HashObject";
export class HashMap {
    keyToValSet;
    valToKeySet;
    constructor(values) {
        this.keyToValSet = {};
        this.valToKeySet = {};
        if (values) {
            this.putAll(values);
        }
    }
    containsKey(key) {
        const hash = HashObject(key);
        return (typeof this.keyToValSet[hash] !== "undefined" &&
            this.keyToValSet[hash] !== null);
    }
    get(key) {
        return this.getOrDefault(key, null);
    }
    getOrDefault(key, defaultValue) {
        const hash = HashObject(key);
        return this.keyToValSet[hash]?.val || defaultValue;
    }
    isEmpty() {
        return Object.keys(this.keyToValSet).length == 0;
    }
    put(key, value) {
        if (!this.containsKey(key)) {
            const keyHash = HashObject(key);
            const valHash = HashObject(value);
            this.keyToValSet[keyHash] = { val: value, hash: valHash };
            this.valToKeySet[valHash] = { val: key, hash: keyHash };
        }
        else {
            this.replace(key, value);
        }
        return value;
    }
    putAll(m) {
        m.forEach((x) => this.put(x[0], x[1]));
    }
    putIfAbsent(key, value) {
        const got = this.get(key);
        if (!got || got == null)
            this.put(key, value);
        return got;
    }
    remove(key, value) {
        const keyHash = HashObject(key);
        const found = this.keyToValSet[keyHash];
        if (found && (!value || value == found)) {
            const valHash = HashObject(found);
            delete this.keyToValSet[keyHash];
            delete this.valToKeySet[valHash];
            return found?.val || null;
        }
        return null;
    }
    replace(key, value) {
        const keyHash = HashObject(key);
        const found = this.keyToValSet[keyHash];
        if (found) {
            const oldValHash = HashObject(found);
            const newValHash = HashObject(value);
            this.keyToValSet[keyHash] = { val: value, hash: newValHash };
            delete this.valToKeySet[oldValHash];
            this.valToKeySet[newValHash] = { val: key, hash: keyHash };
            return found?.val || null;
        }
        return null;
    }
    replaceIf(key, oldValue, newValue) {
        const keyHash = HashObject(key);
        const found = this.keyToValSet[keyHash];
        if (found && (!oldValue || oldValue == found)) {
            const oldValHash = HashObject(found);
            const newValHash = HashObject(newValue);
            this.keyToValSet[keyHash] = { val: newValue, hash: newValHash };
            delete this.valToKeySet[oldValHash];
            this.valToKeySet[newValHash] = { val: key, hash: keyHash };
            return found?.val || null;
        }
        return null;
    }
    clear() {
        this.keyToValSet = {};
        this.valToKeySet = {};
    }
    size() {
        return Object.keys(this.keyToValSet).length;
    }
    keySet() {
        return Object.values(this.valToKeySet).map((x) => x.val);
    }
    values() {
        return Object.values(this.keyToValSet).map((x) => x.val);
    }
    entrySet() {
        const set = [];
        for (let pair of Object.entries(this.valToKeySet)) {
            set.push([pair[1].val, this.keyToValSet[pair[1].hash].val]);
        }
        return set;
    }
    computeIfAbsent(key, mappingFunction) {
        const got = this.get(key);
        if (!got || got == null) {
            const newVal = mappingFunction(key);
            this.put(key, newVal);
            return newVal;
        }
        return got;
    }
    computeIfPresent(key, remappingFunction) {
        const got = this.get(key);
        if (got && got !== null) {
            const newVal = remappingFunction(key, got);
            this.replace(key, newVal);
            return newVal;
        }
        return null;
    }
}
