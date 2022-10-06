import { PrivateConstructorClassInmemoryCache, freezedInstanceCache } from '.'

describe('singleton', () => {
  describe('pricate constructor class singleton pattern', () => {
    test('instance equality', () => {
      const instance1 = PrivateConstructorClassInmemoryCache.getInstance()
      const instance2 = PrivateConstructorClassInmemoryCache.getInstance()

      expect(instance1 === instance2).toBe(true)
    })

    test('add values', () => {
      const instance = PrivateConstructorClassInmemoryCache.getInstance()
      instance.put('key1', 'value1')

      expect(instance.size()).toBe(1)

      const instance2 = PrivateConstructorClassInmemoryCache.getInstance()
      expect(() => {
        instance2.put('key1', 'value2')
      }).toThrowError('테스트를 위해 강제로 만든 에러.')

      const instance3 = PrivateConstructorClassInmemoryCache.getInstance()
      instance3.put('key2', 'value2')

      expect(instance.size()).toBe(2)
      expect(instance2.size()).toBe(2)
      expect(instance3.size()).toBe(2)
    })
  })

  describe('freezed object', () => {
    test('add values', () => {
      freezedInstanceCache.put('key1', 'value1')

      expect(freezedInstanceCache.size()).toBe(1)

      expect(() => {
        freezedInstanceCache.put('key1', 'value2')
      }).toThrowError('테스트를 위해 강제로 만든 에러.')

      freezedInstanceCache.put('key2', 'value2')

      expect(freezedInstanceCache.size()).toBe(2)
    })
  })
})
