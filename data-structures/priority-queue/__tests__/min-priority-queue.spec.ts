import { PriorityQueue } from '../'

describe('priority-queue', () => {
  test('create a min priority queue', () => {
    const priorityQueue = new PriorityQueue()

    expect(priorityQueue).toBeDefined()
    expect(priorityQueue.peek()).toBeNull()
    expect(priorityQueue.isEmpty()).toBe(true)
  })

  test('add values in descending order', () => {
    const priorityQueue = new PriorityQueue<string>()

    priorityQueue.enqueue('a', 1)
    priorityQueue.enqueue('b', 2)
    priorityQueue.enqueue('c', 3)
    priorityQueue.enqueue('d', 4)
    priorityQueue.enqueue('e', 5)
    priorityQueue.enqueue('f', 6)

    expect(priorityQueue.toString()).toBe('a,b,c,d,e,f')
  })

  test('add values in ascending order', () => {
    const priorityQueue = new PriorityQueue<string>()

    priorityQueue.enqueue('a', 6)
    priorityQueue.enqueue('b', 5)
    priorityQueue.enqueue('c', 4)
    priorityQueue.enqueue('d', 3)
    priorityQueue.enqueue('e', 2)
    priorityQueue.enqueue('f', 1)

    expect(priorityQueue.toString()).toBe('f,e,d,c,b,a')
  })

  test('add values randomly', () => {
    const priorityQueue = new PriorityQueue<string>()

    priorityQueue.enqueue('a', 2)
    priorityQueue.enqueue('b', 5)
    priorityQueue.enqueue('c', 6)
    priorityQueue.enqueue('d', 3)
    priorityQueue.enqueue('e', 1)
    priorityQueue.enqueue('f', 4)

    expect(priorityQueue.toString()).toBe('e,a,d,f,b,c')

    let value = priorityQueue.dequeue()
    expect(value).toBe('e')
    expect(priorityQueue.toString()).toBe('a,d,f,b,c')
    expect(priorityQueue.queue.length).toBe(5)

    value = priorityQueue.dequeue()
    expect(value).toBe('a')
    expect(priorityQueue.toString()).toBe('d,f,b,c')
    expect(priorityQueue.queue.length).toBe(4)

    priorityQueue.dequeue()
    priorityQueue.dequeue()
    priorityQueue.dequeue()
    priorityQueue.dequeue()

    value = priorityQueue.dequeue()
    expect(value).toBeNull()
    expect(priorityQueue.isEmpty()).toBe(true)
  })
})
