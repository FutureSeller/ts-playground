import { Expect, Equal } from './types/utility'
export {}

type TupleToUnion<T> = T extends Array<infer Item> ? Item : never
type TupleToUnion2<T extends unknown[]> = T[number]

type cases = [Expect<Equal<TupleToUnion<[1, 2, 3]>, 1 | 2 | 3>>, Expect<Equal<TupleToUnion2<[1, 2, 3]>, 1 | 2 | 3>>]
