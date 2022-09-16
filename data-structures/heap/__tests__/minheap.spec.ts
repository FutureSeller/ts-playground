import { MinHeap } from '../'

describe('minheap', () => {
  test('create a minheap', () => {
    const minheap = new MinHeap()

    expect(minheap).toBeDefined()
    expect(minheap.peek()).toBeNull()
    expect(minheap.isEmpty()).toBe(true)
  })

  test('add items to the minheap', () => {
    const minheap = new MinHeap<number>()

    minheap.add(5)
    expect(minheap.isEmpty()).toBe(false)
    expect(minheap.peek()).toBe(5)
    expect(minheap.toString()).toBe('5')

    minheap.add(3)
    expect(minheap.peek()).toBe(3)
    expect(minheap.toString()).toBe('3,5')

    minheap.add(10)
    expect(minheap.peek()).toBe(3)
    expect(minheap.toString()).toBe('3,5,10')

    minheap.add(1)
    expect(minheap.peek()).toBe(1)
    expect(minheap.toString()).toBe('1,3,10,5')

    minheap.add(1)
    expect(minheap.peek()).toBe(1)
    expect(minheap.toString()).toBe('1,1,10,5,3')

    expect(minheap.remove()).toBe(1)
    expect(minheap.toString()).toBe('1,3,10,5')

    expect(minheap.remove()).toBe(1)
    expect(minheap.toString()).toBe('3,5,10')

    expect(minheap.remove()).toBe(3)
    expect(minheap.toString()).toBe('5,10')
  })

  it('remove an top item from the minheap', () => {
    const minHeap = new MinHeap<number>()

    minHeap.add(5)
    minHeap.add(3)
    minHeap.add(10)
    minHeap.add(11)
    minHeap.add(1)

    expect(minHeap.toString()).toBe('1,3,10,11,5')

    expect(minHeap.remove()).toBe(1)
    expect(minHeap.toString()).toBe('3,5,10,11')

    expect(minHeap.remove()).toBe(3)
    expect(minHeap.toString()).toBe('5,11,10')

    expect(minHeap.remove()).toBe(5)
    expect(minHeap.toString()).toBe('10,11')

    expect(minHeap.remove()).toBe(10)
    expect(minHeap.toString()).toBe('11')

    expect(minHeap.remove()).toBe(11)
    expect(minHeap.toString()).toBe('')

    expect(minHeap.remove()).toBeNull()
    expect(minHeap.toString()).toBe('')
  })
})
