import { HashObject } from "./HashObject"

export class HashMap<K, V> {
	keyToValSet: { [key: number]: { val: V; hash: number } }
	valToKeySet: { [key: number]: { val: K; hash: number } }

	constructor(values?: [K, V][]) {
		this.keyToValSet = {}
		this.valToKeySet = {}

		if (values) {
			this.putAll(values)
		}
	}

	containsKey(key: K): boolean {
		const hash = HashObject(key)
		return (
			typeof this.keyToValSet[hash] !== "undefined" &&
			this.keyToValSet[hash] !== null
		)
	}

	get(key: K): V | null {
		return this.getOrDefault(key, null)
	}

	getOrDefault(key: K, defaultValue: V): V {
		const hash = HashObject(key)
		return this.keyToValSet[hash]?.val || defaultValue
	}

	isEmpty(): boolean {
		return Object.keys(this.keyToValSet).length == 0
	}

	put(key: K, value: V): V {
		if (!this.containsKey(key)) {
			const keyHash = HashObject(key)
			const valHash = HashObject(value)
			this.keyToValSet[keyHash] = { val: value, hash: valHash }
			this.valToKeySet[valHash] = { val: key, hash: keyHash }
		} else {
			this.replace(key, value)
		}
		return value
	}

	putAll(m: [K, V][]) {
		m.forEach((x) => this.put(x[0], x[1]))
	}

	putIfAbsent(key: K, value: V): V {
		const got = this.get(key)
		if (!got || got == null) this.put(key, value)
		return got
	}

	remove(key: K, value?: V): V | null {
		const keyHash = HashObject(key)
		const found = this.keyToValSet[keyHash]
		if (found && (!value || value == found)) {
			const valHash = HashObject(found)
			delete this.keyToValSet[keyHash]
			delete this.valToKeySet[valHash]
			return found?.val || null
		}
		return null
	}

	replace(key: K, value: V): V | null {
		const keyHash = HashObject(key)
		const found = this.keyToValSet[keyHash]
		if (found) {
			const oldValHash = HashObject(found)
			const newValHash = HashObject(value)
			this.keyToValSet[keyHash] = { val: value, hash: newValHash }
			delete this.valToKeySet[oldValHash]
			this.valToKeySet[newValHash] = { val: key, hash: keyHash }
			return found?.val || null
		}
		return null
	}

	replaceIf(key: K, oldValue: V, newValue: V): V | null {
		const keyHash = HashObject(key)
		const found = this.keyToValSet[keyHash]
		if (found && (!oldValue || oldValue == found)) {
			const oldValHash = HashObject(found)
			const newValHash = HashObject(newValue)
			this.keyToValSet[keyHash] = { val: newValue, hash: newValHash }
			delete this.valToKeySet[oldValHash]
			this.valToKeySet[newValHash] = { val: key, hash: keyHash }
			return found?.val || null
		}
		return null
	}

	clear(): void {
		this.keyToValSet = {}
		this.valToKeySet = {}
	}

	size(): number {
		return Object.keys(this.keyToValSet).length
	}

	keySet(): K[] {
		return Object.values(this.valToKeySet).map((x) => x.val)
	}

	values(): V[] {
		return Object.values(this.keyToValSet).map((x) => x.val)
	}

	entrySet(): [K, V][] {
		const set: [K, V][] = []
		for (let pair of Object.entries(this.valToKeySet)) {
			set.push([pair[1].val, this.keyToValSet[pair[1].hash].val])
		}
		return set
	}

	computeIfAbsent(key: K, mappingFunction: (key: K) => V): V | null {
		const got = this.get(key)
		if (!got || got == null) {
			const newVal = mappingFunction(key)
			this.put(key, newVal)
			return newVal
		}
		return got
	}

	computeIfPresent(
		key: K,
		remappingFunction: (key: K, value: V) => V
	): V | null {
		const got = this.get(key)
		if (got && got !== null) {
			const newVal = remappingFunction(key, got)
			this.replace(key, newVal)
			return newVal
		}
		return null
	}
}
