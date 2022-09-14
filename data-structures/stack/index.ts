import { LinkedList } from '../linkedlist'

interface IStack<T> {
  isEmpty(): boolean
  peek(): T | null
  push(value: T): void
  pop(): T | null
  toString(callback?: (value: T) => string): string
}

export class Stack<T> implements IStack<T> {
  private stack: LinkedList<T>

  constructor() {
    this.stack = new LinkedList()
  }

  isEmpty() {
    return !this.stack.head
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.stack.head!.value
  }

  push(value: T) {
    this.stack.prepend(value)
  }

  pop() {
    return this.stack.removeHead()
  }

  toString() {
    return this.stack.toString()
  }
}
