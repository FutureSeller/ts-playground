import { Queue } from '../'

describe('queue', () => {
  test('create a queue', () => {
    const queue = new Queue<number>()
    expect(queue.toString()).toEqual('')
  })

  test('isEmpty', () => {
    const queue = new Queue<number>()
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(1)
    expect(queue.isEmpty()).toBe(false)
  })

  test('enqueue', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    expect(queue.toString()).toEqual('1')
  })

  test('dequeue', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.dequeue()
    expect(queue.toString()).toEqual('2')
  })

  test('peek', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.peek()).toBe(1)

    queue.dequeue()
    expect(queue.peek()).toBe(2)
  })
})
