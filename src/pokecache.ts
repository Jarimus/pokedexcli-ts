export type CacheEntry<T> = {
    createdAt: number,
    val: T
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const newVal: CacheEntry<T> = {
        createdAt: Date.now(),
        val: val
    }
    this.#cache.set(key, newVal);
  };

  get<T>(key: string) {
    return this.#cache.get(key)?.val;
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval)
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  #reap() {
    this.#cache.forEach( (entry, key, map) => {
        const limit = Date.now() - this.#interval;
        if ( entry === undefined || entry.createdAt <= limit ) {
            map.delete(key);
        }
    })
  }
};

