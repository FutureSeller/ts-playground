import { Comparator } from '../comparator'

describe('comparator', () => {
  test('compare with defalut comparator function', () => {
    const comparator = new Comparator()

    expect(comparator.equal(0, 0)).toBe(true)
    expect(comparator.equal(0, 1)).toBe(false)
    expect(comparator.equal('a', 'a')).toBe(true)
    expect(comparator.lessThan(1, 2)).toBe(true)
    expect(comparator.lessThan(-1, 2)).toBe(true)
    expect(comparator.lessThan('a', 'b')).toBe(true)
    expect(comparator.lessThan('a', 'ab')).toBe(true)
    expect(comparator.lessThan(10, 2)).toBe(false)
    expect(comparator.greaterThan(0, 0)).toBe(false)
    expect(comparator.greaterThan(10, 0)).toBe(true)
  })

  test('compare with custom comparator function', () => {
    const comparator = new Comparator((a: string, b: string) => {
      if (a.length === b.length) {
        return 0
      }

      return a.length < b.length ? -1 : 1
    })

    expect(comparator.equal('a', 'b')).toBe(true)
    expect(comparator.equal('a', '')).toBe(false)
    expect(comparator.lessThan('b', 'aa')).toBe(true)

    comparator.reverse()

    expect(comparator.equal('a', 'b')).toBe(true)
    expect(comparator.equal('a', '')).toBe(false)
    expect(comparator.lessThan('b', 'aa')).toBe(false)
  })
})
