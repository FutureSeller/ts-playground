import { selectionSort } from '../selection'

describe('selection sort', () => {
  test('descending order', () => {
    const array = Array.from({ length: 100 }).map((_, i) => i + 1)

    expect(selectionSort(array.reverse())).toEqual(array)
  })

  test('random order', () => {
    const array = [55, 7, 78, 12, 42]

    expect(selectionSort([...array]).join(',')).toBe('7,12,42,55,78')
  })
})
