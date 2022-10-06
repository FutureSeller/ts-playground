type ValueType = number | string

class InMemoryCache {
  private cache: Map<string, ValueType> = new Map()

  public log() {
    console.log('PrivateConstructorClassInmemoryCache log')
  }

  public put(key: string, item: ValueType) {
    if (this.cache.has(key)) {
      throw new Error('테스트를 위해 강제로 만든 에러.')
    }
    this.cache.set(key, item)
  }

  public get(key: string) {
    if (!this.cache.has(key)) {
      console.warn(`[PrivateConstructorClassInmemoryCache]: ${key} does not exsits`)
      return null
    }
    return this.cache.get(key)
  }

  public size() {
    return this.cache.size
  }
}
const cache = new InMemoryCache()
export const freezedInstanceCache = Object.freeze(cache)

export class PrivateConstructorClassInmemoryCache extends InMemoryCache {
  private static instance: PrivateConstructorClassInmemoryCache

  static getInstance(): PrivateConstructorClassInmemoryCache {
    if (!PrivateConstructorClassInmemoryCache.instance) {
      PrivateConstructorClassInmemoryCache.instance = new PrivateConstructorClassInmemoryCache()
    }

    return PrivateConstructorClassInmemoryCache.instance
  }
}
