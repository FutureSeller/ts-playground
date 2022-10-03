import { Expect, Equal, MergeInsertions } from '../type-challenges/types/utility'

// 조건부 타입은 자동으로 유니언 타입을 할당하는데, never는 빈 타입이라 할당이 발생하면 할당할 것이 없어 never가 된다고 한다.
type IsNeverWithoutTuple<T> = T extends never ? true : false
type IsNever<T> = [T] extends [never] ? true : false

// union and intersection types
type neverCases = [
  Expect<Equal<never | number, number>>,
  Expect<Equal<never & number, never>>,
  Expect<Equal<string & number, never>>,
  Expect<Equal<string & boolean, never>>,
  Expect<Equal<IsNeverWithoutTuple<never>, never>>,
  Expect<Equal<IsNever<never>, true>>
]

type TemporalNeverType = '$TemporalNeverType'
type MyFakeAwaited<T> = T extends Promise<infer R> ? R : TemporalNeverType
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : TemporalNeverType

function throwError(x: string): never {
  throw new Error(x)
}
const rejected = Promise.reject('anyway')

type serveralUseCases = [
  Expect<Equal<MyReturnType<typeof throwError>, never>>,
  Expect<Equal<MyFakeAwaited<typeof rejected>, never>>
]

// Reference: https://ui.toast.com/weekly-pick/ko_20220323#%ED%83%80%EC%9D%B4%ED%95%91%EC%9D%84-%EB%B6%80%EB%B6%84%EC%A0%81%EC%9C%BC%EB%A1%9C-%ED%97%88%EC%9A%A9%ED%95%98%EC%A7%80-%EC%95%8A%EB%8A%94%EB%8B%A4
type VariantA = {
  a: string
  b?: never
}
type VariantB = {
  a?: never
  b: number
}

declare function fn(arg: VariantA | VariantB): void
fn({ a: 'foo' })
fn({ b: 123 })
fn({}) // error!

// Reference: https://github.com/microsoft/TypeScript/pull/36696
// accessing properties on an empty intersection now produces errors, similarly to accessing properties on a never value

// string & number ==> never: AB treated as A & B but, foo goes never
type A = { kind1: 'a'; foo: string }
type B = { kind2: 'b'; foo: number }
type AB = A & B

type C = { kind: 'a'; foo: string }
type D = { kind: 'b'; foo: string }
type CD = C & D // never << 같은 프로퍼티를 합치려고 했기 때문

type E = { kind1: 'a'; foo: string }
type F = { kind2: 'b'; foo: string }
type EF = E & F

type objectIntersectionCases = [
  Expect<Equal<MergeInsertions<AB>, { kind1: 'a'; kind2: 'b'; foo: never }>>,
  Expect<Equal<CD, never>>,
  Expect<Equal<MergeInsertions<EF>, { kind1: 'a'; kind2: 'b'; foo: string }>>
]
