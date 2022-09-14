import { Stack } from '../'

describe('stack', () => {
  test('create a stack', () => {
    const stack = new Stack<number>()
    expect(stack.toString()).toBe('')
  })

  test('isEmpty', () => {
    const stack = new Stack<number>()
    expect(stack.isEmpty()).toBe(true)

    stack.push(1)
    expect(stack.isEmpty()).toBe(false)
  })

  test('push', () => {
    const stack = new Stack<number>()
    stack.push(1)
    expect(stack.toString()).toBe('1')

    stack.push(2)
    expect(stack.toString()).toBe('2,1')
  })

  test('pop', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    stack.pop()
    expect(stack.toString()).toBe('1')

    stack.pop()
    expect(stack.toString()).toBe('')

    expect(stack.pop()).toBe(null)
  })

  test('peek', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    expect(stack.peek()).toBe(2)

    const value = stack.pop()
    expect(value).toBe(2)
    expect(stack.peek()).toBe(1)
  })
})
