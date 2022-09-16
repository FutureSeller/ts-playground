import { Comparator } from '../utils/comparator'
import type { CompareFunctionType } from '../utils/comparator'

interface IHeap<T> {
  add(value: T): void
  isEmpty(): boolean
  peek(): T | null
  remove(): T | null
}

export class Heap<T> implements IHeap<T> {
  public heap: T[]
  public comparator: Comparator<T>

  constructor(compareFunction?: CompareFunctionType<T>) {
    if (new.target === Heap) {
      throw new Error('You cannot create a heap object directly.')
    }

    this.heap = []
    this.comparator = new Comparator(compareFunction)
  }

  add(value: T) {
    this.heap.push(value)
    this.heapifyUp()
  }

  isEmpty() {
    return !this.heap.length
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.heap[0]
  }

  remove() {
    if (this.isEmpty()) {
      return null
    }

    if (this.heap.length === 1) {
      return this.heap.pop() as T
    }

    const returnValue = this.heap[0]
    const lastValue = this.heap.pop() as T

    this.heap[0] = lastValue
    this.heapifyDown()

    return returnValue
  }

  toString() {
    return this.heap.join(',')
  }

  private heapifyUp() {
    let currentIndex = this.heap.length - 1

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(this.heap[this.getParentIndex(currentIndex)], this.heap[currentIndex])
    ) {
      this.swap(this.getParentIndex(currentIndex), currentIndex)
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  private heapifyDown(startIndex = 0) {
    let currentIndex = startIndex
    let nextIndex = -1

    while (this.hasLeftChild(currentIndex)) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex)
      const rightChildIndex = this.getRightChildIndex(currentIndex)

      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(this.heap[rightChildIndex], this.heap[leftChildIndex])
      ) {
        nextIndex = rightChildIndex
      } else {
        nextIndex = leftChildIndex
      }

      if (this.pairIsInCorrectOrder(this.heap[currentIndex], this.heap[nextIndex])) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  private swap(a: number, b: number) {
    const temp = this.heap[b]
    this.heap[b] = this.heap[a]
    this.heap[a] = temp
  }

  private getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1
  }

  private hasLeftChild(parentIndex: number) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length
  }

  private getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2
  }

  private hasRightChild(parentIndex: number) {
    return this.getRightChildIndex(parentIndex) < this.heap.length
  }

  private getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2)
  }

  private hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0
  }

  pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean | never {
    throw new Error(`
      You have to implement heap pair comparison method
      for ${firstElement} and ${secondElement} values.
    `)
  }
}
