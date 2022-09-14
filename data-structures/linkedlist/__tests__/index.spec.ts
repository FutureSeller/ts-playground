import { LinkedList } from '../'

describe('linkedlist', () => {
  test('create a linkedlist', () => {
    const list = new LinkedList<number>()
    expect(list.toString()).toEqual('')
  })

  test('add a value', () => {
    const list = new LinkedList<number>()
    list.add(1)
    expect(list.toString()).toEqual('1')
  })

  test('prepend a value', () => {
    const list = new LinkedList<number>()
    list.add(1)
    list.prepend(2)
    expect(list.toString()).toEqual('2,1')
  })

  test('remove a prepended value', () => {
    const list = new LinkedList<number>()
    list.add(1)
    list.prepend(2)
    list.add(3)
    list.remove(2)
    expect(list.toString()).toEqual('1,3')
  })

  test('remove an added value', () => {
    const list = new LinkedList<number>()
    list.add(1)
    list.prepend(2)
    list.remove(1)
    expect(list.toString()).toEqual('2')
  })

  test('remove a head', () => {
    const list = new LinkedList<number>()
    list.add(1)
    list.add(2)
    list.removeHead()
    expect(list.toString()).toEqual('2')
  })

  test('get size of linkedlist', () => {
    const list = new LinkedList<number>()
    list.add(1)
    list.prepend(2)
    expect(list.size()).toEqual(2)
  })
})
