import { Heap } from './heap'

export class MinHeap<T> extends Heap<T> {
  pairIsInCorrectOrder(firstElement: T, secondElement: T) {
    return this.comparator.lessThanEqual(firstElement, secondElement)
  }
}
