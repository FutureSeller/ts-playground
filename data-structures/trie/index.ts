class TrieNode {
  public children: Map<string, TrieNode>
  public isEndOfWord: boolean
  public character: string

  constructor(character: string, isEndOfWowrd = false) {
    this.character = character
    this.isEndOfWord = isEndOfWowrd
    this.children = new Map()
  }

  hasChildren() {
    return Array.from(this.children.keys()).length > 0
  }

  getChild(character: string) {
    return this.children.get(character)
  }

  hasChild(key: string) {
    return this.children.has(key)
  }

  addChild(character: string, isEndOfWord = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character))
    }

    const childNode = this.getChild(character)
    if (!childNode) {
      throw new Error('Unexpected Error')
    }

    childNode.isEndOfWord = childNode.isEndOfWord || isEndOfWord
    return childNode
  }

  removeChild(character: string) {
    const child = this.getChild(character)

    if (child && !child.isEndOfWord && !child.hasChildren()) {
      this.children.delete(character)
    }
    return this
  }

  toString() {
    const childrenKeys = Array.from(this.children.keys())
    childrenKeys.sort()

    return `${this.character}:${this.isEndOfWord ? '$' : '*'}:${childrenKeys.join(',')}`
  }
}

interface ITrie {
  insert(key: string): void
  search(key: string): boolean
  delete(key: string): void
}

export class Trie implements ITrie {
  public root: TrieNode

  constructor() {
    this.root = new TrieNode('^')
  }

  insert(key: string) {
    let pointer = this.root
    for (let i = 0; i < key.length; ++i) {
      pointer = pointer.addChild(key[i], i === key.length - 1)
    }
  }

  search(key: string) {
    let pointer: TrieNode = this.root

    for (let i = 0; i < key.length; ++i) {
      if (!pointer.hasChild(key[i])) {
        return false
      }

      const child = pointer.getChild(key[i])
      if (!child) {
        return false
      }
      pointer = child
    }

    return !!pointer && pointer.isEndOfWord
  }

  delete(key: string) {
    const depthFirstDelete = (currentNode: TrieNode, charIndex = 0) => {
      if (charIndex >= key.length) {
        return
      }
      const character = key[charIndex]
      const nextNode = currentNode.getChild(character)
      if (nextNode == null) {
        return
      }

      depthFirstDelete(nextNode, charIndex + 1)

      if (charIndex === key.length - 1) {
        nextNode.isEndOfWord = false
      }

      currentNode.removeChild(key[charIndex])
    }

    depthFirstDelete(this.root)
  }
}
