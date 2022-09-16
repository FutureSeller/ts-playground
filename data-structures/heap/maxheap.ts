import { Heap } from './heap'

export class MaxHeap<T> extends Heap<T> {
  pairIsInCorrectOrder(firstElement: T, secondElement: T) {
    return this.comparator.greaterThanEqual(firstElement, secondElement)
  }
}
