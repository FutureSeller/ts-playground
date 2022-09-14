class LinkedListNode<T> {
  public next: LinkedListNode<T> | null = null
  public prev: LinkedListNode<T> | null = null
  constructor(public value: T) {}

  public toString(callback?: (value: T) => string) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

interface ILinkedList<T> {
  add(value: T): LinkedListNode<T>
  prepend(value: T): LinkedListNode<T>
  contains(value: T): boolean
  remove(value: T): void
  removeHead(): T | null
  size(): number
  toArray(): LinkedListNode<T>[]
  toString(callback: (value: T) => string): string
}

export class LinkedList<T> implements ILinkedList<T> {
  public head: LinkedListNode<T> | null = null

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

  public removeHead() {
    if (!this.head) {
      return null
    }

    const node = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
    }

    return node.value
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

  public size() {
    let count = 0
    let pointer = this.head
    while (pointer) {
      count += 1
      pointer = pointer.next
    }
    return count
  }

  public toArray() {
    const nodes: LinkedListNode<T>[] = []
    let pointer = this.head
    while (pointer) {
      nodes.push(pointer)
      pointer = pointer.next
    }
    return nodes
  }

  public toString(callback?: (value: T) => string) {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString()
  }
}
