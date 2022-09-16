import { Heap } from '../heap'

describe('heap', () => {
  test('cannot create a heap object directly', () => {
    expect(() => {
      new Heap()
    }).toThrowError('You cannot create a heap object directly.')
  })
})
