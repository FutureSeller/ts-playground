import { BinarySearchTree } from '../'
import { Comparator } from '../../../utils/comparator'

describe('binary-search-tree', () => {
  test('create BST', () => {
    const bst = new BinarySearchTree()

    expect(bst).toBeDefined()
    expect(bst.root).toBeNull()
  })

  test('add values', () => {
    const bst = new BinarySearchTree<number>()

    const dummyData = [20, 8, 22, 4, 12, 10, 14]
    dummyData.forEach(item => {
      bst.insert(item)
    })

    dummyData.forEach(item => {
      expect(bst.contains(item)).toBe(true)
    })

    dummyData.sort(Comparator.defaultCompareFunction)
    expect(bst.printInorder()).toBe(dummyData.join(','))
  })

  test('remove values', () => {
    const bst = new BinarySearchTree<number>()

    const dummyData = [20, 8, 22, 4, 12, 10, 14]
    dummyData.forEach(item => {
      bst.insert(item)
    })

    bst.remove(8)
    expect(bst.contains(8)).toBe(false)

    bst.remove(22)
    expect(bst.contains(22)).toBe(false)
    expect(bst.root?.right).toBeNull()

    dummyData.sort(Comparator.defaultCompareFunction)
    expect(bst.printInorder()).toBe(dummyData.filter(item => item !== 8 && item !== 22).join(','))
  })
})
