import { LinkedList } from '../linkedlist'

interface IQueue<T> {
  isEmpty(): boolean
  peek(): T | null
  enqueue(value: T): void
  dequeue(): T | null
  toString(callback?: (value: T) => string): string
}

export class Queue<T> implements IQueue<T> {
  private queue: LinkedList<T>

  constructor() {
    this.queue = new LinkedList()
  }

  isEmpty() {
    return !this.queue.head
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.queue.head!.value
  }

  enqueue(value: T) {
    this.queue.add(value)
  }

  dequeue() {
    return this.queue.removeHead()
  }

  toString() {
    return this.queue.toString()
  }
}
