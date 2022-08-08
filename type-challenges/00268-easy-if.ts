export {}

type If<Condition, TrueCase, FalseCase> = Condition extends boolean
  ? Condition extends true
    ? TrueCase
    : FalseCase
  : never

type A = If<true, 'a', 'b'> // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'

type C = If<'A', 'a', 'b'> // expected to be 'never'
