import { Trie } from '../'

describe('trie', () => {
  test('create a trie', () => {
    const trie = new Trie()

    expect(trie).toBeDefined()
    expect(trie.root.toString()).toBe('^:*:')
  })

  test('add words to trie and search them', () => {
    const trie = new Trie()

    trie.insert('javascript')
    expect(trie.search('javascript')).toBe(true)

    trie.insert('typescript')
    expect(trie.search('typescript')).toBe(true)
    expect(trie.root.toString()).toBe('^:*:j,t')
    expect(trie.search('rescript')).toBe(false)
  })

  test('add / delete words and search them', () => {
    const trie = new Trie()

    trie.insert('javascript')
    expect(trie.search('javascript')).toBe(true)

    trie.insert('typescript')
    expect(trie.search('typescript')).toBe(true)

    trie.delete('javascript')
    expect(trie.search('javascript')).toBe(false)
    expect(trie.root.toString()).toBe('^:*:t')

    trie.delete('typescript')
    expect(trie.search('typescript')).toBe(false)
    expect(trie.root.toString()).toBe('^:*:')
  })

  test('add / delete sub-words', () => {
    const trie = new Trie()

    const initialData = ['javascript', 'java', 'jail', 'joe', 'ja']
    initialData.forEach(word => {
      trie.insert(word)
    })
    initialData.forEach(word => {
      expect(trie.search(word)).toBe(true)
    })

    expect(trie.root.getChild('j')?.toString()).toBe('j:*:a,o')
    expect(trie.root.getChild('j')?.getChild('o')?.toString()).toBe('o:*:e')
    expect(trie.root.getChild('j')?.getChild('o')?.getChild('e')?.toString()).toBe('e:$:')

    expect(trie.root.getChild('j')?.getChild('a')?.toString()).toBe('a:$:i,v')
    trie.delete('ja')
    expect(trie.root.getChild('j')?.getChild('a')?.toString()).toBe('a:*:i,v')

    trie.delete('java')
    trie.delete('javascript')
    expect(trie.root.getChild('j')?.toString()).toBe('j:*:a,o')

    trie.delete('joe')
    expect(trie.root.getChild('j')?.getChild('o')).toBeUndefined()

    expect(trie.search('jail')).toBe(true)
  })
})
