import { Expect, Equal } from './types/utility'

export {}

type Includes<T extends readonly unknown[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : Includes<R, U>
  : false

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 4], 1>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 4], 5>, false>>,
  Expect<Equal<Includes<[{ a: 'A' }], { a: 'A' }>, true>>
]
