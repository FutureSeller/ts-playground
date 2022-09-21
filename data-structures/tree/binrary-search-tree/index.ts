class BinarySearchTreeNode<T> {
  public value: T
  public left: BinarySearchTreeNode<T> | null = null
  public right: BinarySearchTreeNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }

  insert(node: BinarySearchTreeNode<T> | null, value: T): BinarySearchTreeNode<T> {
    if (node == null) {
      return new BinarySearchTreeNode(value)
    }

    if (node.value > value) {
      node.left = node.insert(node.left, value)
    } else if (node.value < value) {
      node.right = node.insert(node.right, value)
    } else {
      console.debug('the value already exists.')
    }

    return node
  }

  remove(node: BinarySearchTreeNode<T> | null, value: T): BinarySearchTreeNode<T> | null {
    if (node == null) {
      return null
    }

    if (node.value > value) {
      node.left = this.remove(node.left, value)
    } else if (node.value < value) {
      node.right = this.remove(node.right, value)
    } else {
      if (node.left == null) {
        return node.right
      }
      if (node.right == null) {
        return node.left
      }

      const minNode = node.right.getMiniumNode()
      if (minNode == null || minNode.value == null) {
        throw new Error('unexpected error.')
      }

      node.value = minNode.value
      node.right = this.remove(node.right, node.value)
    }

    return node
  }

  findNode(node: BinarySearchTreeNode<T> | null, value: T): BinarySearchTreeNode<T> | null {
    if (node == null) {
      return null
    }

    if (node.value === value) {
      return node
    }

    return node.value > value ? this.findNode(node.left, value) : this.findNode(node.right, value)
  }

  getMiniumNode(): BinarySearchTreeNode<T> | null {
    if (!this.left) {
      return this
    }

    return this.left.getMiniumNode()
  }

  toString() {
    return this.value ? JSON.stringify(this.value) : ''
  }
}

interface IBinarySearchTree<T> {
  insert(value: T): void
  remove(value: T): void
  contains(value: T): boolean
}

export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  public root: BinarySearchTreeNode<T> | null = null

  insert(value: T) {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(value)
      return
    }

    this.root = this.root.insert(this.root, value)
  }

  remove(value: T) {
    if (!this.root) {
      return
    }

    this.root.remove(this.root, value)
  }

  contains(value: T) {
    if (!this.root) {
      return false
    }

    return !!this.root.findNode(this.root, value)
  }

  printInorder(): string {
    const result: string[] = []
    const traverse = (node: BinarySearchTreeNode<T> | null) => {
      if (node == null) {
        return
      }

      traverse(node.left)
      result.push(node.toString())
      traverse(node.right)
    }

    traverse(this.root)
    return result.join(',')
  }
}
