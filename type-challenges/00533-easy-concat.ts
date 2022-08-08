export {}

type Concat<L extends unknown[], R extends unknown[]> = [...L, ...R]

type Result = Concat<[1], [2]> // expected to be [1, 2]
