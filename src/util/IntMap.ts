import { IllegalArgumentError } from "../errors/IllegalArgumentError"
import { HashMap } from "./HashMap"

export class IntMap<V> {
	public static builder<V>(): IntMapBuilder<V> {
		return new IntMapBuilder<V>()
	}

	private values: V[]

	constructor(entries: [number, V][] = []) {
		let maxKey = -1
		for (const entry of entries) {
			maxKey = Math.max(maxKey, entry[0])
		}
		this.values = []
		for (const entry of entries) {
			this.values[entry[0]] = entry[1]
		}
	}

	get(key: number): V {
		if (key < 0) {
			throw new IllegalArgumentError("key must be positive")
		}
		if (key >= this.values.length) {
			return null
		} else {
			return this.values[key]
		}
	}

	set(key: number, value: V): V {
		this.values[key] = value
		return value
	}
}

export class IntMapBuilder<V> {
	private map: HashMap<number, V> = new HashMap<number, V>()

	put(key: number, value: V): IntMapBuilder<V> {
		if (key < 0) {
			throw new IllegalArgumentError("key must be positive: " + key)
		}
		if (this.map.containsKey(key)) {
			throw new IllegalArgumentError("key already exists: " + key)
		}
		this.map.put(key, value)
		return this
	}

	build(): IntMap<V> {
		return new IntMap<V>(this.map.entrySet())
	}
}
