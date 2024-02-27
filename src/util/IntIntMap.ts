import { HashMap } from "./HashMap"
import { IntMap, IntMapBuilder } from "./IntMap"

export class IntIntMap<V> {
	outer: IntMap<IntMap<V>>

	static builder<V>(): IntIntMapBuilder<V> {
		return new IntIntMapBuilder<V>()
	}

	constructor(outer: IntMap<IntMap<V>>) {
		this.outer = outer
	}

	get(key1: number, key2: number): V {
		const inner: IntMap<V> = this.outer.get(key1)
		return inner == null ? null : inner.get(key2)
	}
}

export class IntIntMapBuilder<V> {
	private innerBuilders: HashMap<number, IntMapBuilder<V>> = new HashMap()

	public put(key1: number, key2: number, value: V): IntIntMapBuilder<V> {
		this.innerBuilders
			.computeIfAbsent(key1, (k) => IntMap.builder())
			.put(key2, value)
		return this
	}

	public build(): IntIntMap<V> {
		const outerBuilder: IntMapBuilder<IntMap<V>> = IntMap.builder()
		for (const entry of this.innerBuilders.entrySet()) {
			outerBuilder.put(entry[0], entry[1].build())
		}
		return new IntIntMap<V>(outerBuilder.build())
	}
}
