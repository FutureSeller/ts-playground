type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

type MyReadOnly<T> = {
  readonly [K in keyof T]: T[K]
}

type MyRecord<K extends string, T> = {
  [Key in K]: T
}

type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key]
}

type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}

type MyExclude<T, U> = T extends U ? never : T

type MyExtract<T, U> = T extends U ? T : never

type MyNonNullable<T> = T extends undefined | null ? never : T

type MyParameters<T> = T extends (...args: [...infer Args]) => unknown ? Args : never

type MyConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: [...infer Args]) => unknown
  ? Args
  : never

type MyReturnType<T> = T extends (...args: never) => infer R ? R : never

type MyInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any

type MyRequired<T> = {
  [Key in keyof T]-?: T[Key]
}

type MyAwaited<T> = T extends Promise<infer R> ? R : never

export type MyMaybe<T> = T | null

export type MuNonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => void ? never : K
}[keyof T]

export type MyNonFunctionProperties<T> = Pick<T, MuNonFunctionPropertyNames<T>>

export type MyMerge<F, S> = {
  [Key in keyof F | keyof S]: Key extends keyof S ? S[Key] : Key extends keyof F ? F[Key] : never
}
