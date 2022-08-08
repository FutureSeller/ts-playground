import { Expect, Equal } from './types/utility'

type HelloWorld = string

type test = Expect<Equal<HelloWorld, string>>

export {}
