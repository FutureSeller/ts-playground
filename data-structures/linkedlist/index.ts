class LinkedListNode<T> {
  public next: LinkedListNode<T> | null = null
  public prev: LinkedListNode<T> | null = null
  constructor(public value: T) {}
}

interface ILinkedList<T> {
  add(value: T): LinkedListNode<T>
  prepend(value: T): LinkedListNode<T>
  contains(value: T): boolean
  remove(value: T): void
  traverse(): T[]
  size(): number
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null = null

  public add(value: T) {
    const node = new LinkedListNode(value)
    if (!this.head) {
      this.head = node
    } else {
      let lastNode = this.head
      while (lastNode.next) {
        lastNode = lastNode.next
      }
      node.prev = lastNode
      lastNode.next = node
    }
    return node
  }

  public prepend(value: T) {
    const node = new LinkedListNode(value)
    if (!this.head) {
      this.head = node
    } else {
      this.head.prev = node
      node.next = this.head
      this.head = node
    }
    return node
  }

  public contains(value: T) {
    let pointer = this.head
    while (pointer && pointer.value !== value) {
      pointer = pointer.next
    }
    return !!pointer
  }

  public remove(value: T) {
    if (!this.head) {
      return
    }

    if (this.head.value === value) {
      this.head = this.head.next
      return
    }

    let pointer = this.head

    while (pointer.next && pointer.next.value !== value) {
      pointer = pointer.next
    }

    if (!pointer.next) {
      return
    }

    pointer.next.prev = pointer
    pointer.next = pointer.next.next
  }

  public traverse() {
    const nodes: T[] = []
    let pointer = this.head
    while (pointer) {
      nodes.push(pointer.value)
      pointer = pointer.next
    }
    return nodes
  }

  public size() {
    let count = 0
    let pointer = this.head
    while (pointer) {
      count += 1
      pointer = pointer.next
    }
    return count
  }
}
