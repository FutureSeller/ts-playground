import { Expect, Equal } from '../type-challenges/types/utility'

export type ExtractActionByType<T, G> = T extends { type: G } ? T : never

type TodoAction =
  | {
      type: 'add'
      payload: {
        text: string
      }
    }
  | {
      type: 'toggle'
      payload: {
        id: string
      }
    }
  | {
      type: 'remove'
      payload: {
        id: string
      }
    }
  | {
      type: 'removeAll'
    }

type cases = [
  Expect<
    Equal<
      ExtractActionByType<TodoAction, 'add'>,
      {
        type: 'add'
        payload: {
          text: string
        }
      }
    >
  >,
  Expect<
    Equal<
      ExtractActionByType<TodoAction, 'removeAll'>,
      {
        type: 'removeAll'
      }
    >
  >,
  Expect<Equal<ExtractActionByType<TodoAction, 'asdf'>, never>>
]
