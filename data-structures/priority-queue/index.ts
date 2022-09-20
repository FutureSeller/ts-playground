class QueueElement<T> {
  public priority: number
  public value: T

  constructor(value: T, priority: number) {
    this.value = value
    this.priority = priority
  }
}

interface IPriorityQueue<T> {
  enqueue(value: T, priority: number): void
  dequeue(): T | null
  peek(): T | null
  isEmpty(): boolean
  toString(callback?: (element: T) => string): string
}

export class PriorityQueue<T> implements IPriorityQueue<T> {
  public queue: QueueElement<T>[] = []

  enqueue(value: T, priority: number) {
    const element = new QueueElement(value, priority)
    let contain = false

    for (let i = 0; i < this.queue.length; ++i) {
      if (this.queue[i].priority > element.priority) {
        this.queue.splice(i, 0, element)
        contain = true
        break
      }
    }

    if (!contain) {
      this.queue.push(element)
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null
    }

    const element = this.queue.shift()
    if (element == null) {
      throw new Error('Unexpected Error.')
    }
    return element.value
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.queue[0].value
  }

  isEmpty() {
    return this.queue.length === 0
  }

  toString() {
    return this.queue.map(({ value }) => value).join(',')
  }
}
