export {}

type Push<T extends unknown[], V> = [...T, V]
type PushResult = Push<[1, 2], '3'> // [1, 2, '3']

type Unshift<T extends unknown[], V> = [V, ...T]
type UnshiftResult = Unshift<[1, 2], 0> // [0, 1, 2,]
