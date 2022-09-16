import { MaxHeap } from '../'

describe('maxheap', () => {
  test('create a maxheap', () => {
    const maxheap = new MaxHeap()

    expect(maxheap).toBeDefined()
    expect(maxheap.peek()).toBeNull()
    expect(maxheap.isEmpty()).toBe(true)
  })

  test('add items to the maxheap', () => {
    const maxheap = new MaxHeap<number>()

    maxheap.add(5)
    expect(maxheap.isEmpty()).toBe(false)
    expect(maxheap.peek()).toBe(5)
    expect(maxheap.toString()).toBe('5')

    maxheap.add(3)
    expect(maxheap.peek()).toBe(5)
    expect(maxheap.toString()).toBe('5,3')

    maxheap.add(10)
    expect(maxheap.peek()).toBe(10)
    expect(maxheap.toString()).toBe('10,3,5')

    maxheap.add(1)
    expect(maxheap.peek()).toBe(10)
    expect(maxheap.toString()).toBe('10,3,5,1')

    maxheap.add(1)
    expect(maxheap.peek()).toBe(10)
    expect(maxheap.toString()).toBe('10,3,5,1,1')

    expect(maxheap.remove()).toBe(10)
    expect(maxheap.toString()).toBe('5,3,1,1')

    expect(maxheap.remove()).toBe(5)
    expect(maxheap.toString()).toBe('3,1,1')

    expect(maxheap.remove()).toBe(3)
    expect(maxheap.toString()).toBe('1,1')
  })

  test('remove an top item from the maxheap', () => {
    const maxheap = new MaxHeap<number>()

    maxheap.add(5)
    maxheap.add(3)
    maxheap.add(10)
    maxheap.add(11)
    maxheap.add(1)

    expect(maxheap.toString()).toBe('11,10,5,3,1')

    expect(maxheap.remove()).toBe(11)
    expect(maxheap.toString()).toBe('10,3,5,1')

    expect(maxheap.remove()).toBe(10)
    expect(maxheap.toString()).toBe('5,3,1')

    expect(maxheap.remove()).toBe(5)
    expect(maxheap.toString()).toBe('3,1')

    expect(maxheap.remove()).toBe(3)
    expect(maxheap.toString()).toBe('1')

    expect(maxheap.remove()).toBe(1)
    expect(maxheap.toString()).toBe('')

    expect(maxheap.remove()).toBeNull()
    expect(maxheap.toString()).toBe('')
  })
})
