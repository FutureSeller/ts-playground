/*
방법론 1: 유니온 타입 사용

function double(x: number | string): number | string
function double(x: any) {
  return x + x
}
const num = double(12) // number | string
const string = double('x') // number | string
*/

/*
방법론 2: generic 사용. 리터럴 너무 과하게 추론됨

function double<T extends string | number>(x: T): T
function double(x: any) {
  return x + x
}

const num = double(12) // 12 <-- 리터럴이라 너무 과하게 추론함
const string = double('x') // 'x'
*/

/*
방법론 3: 함수 오버로링. 타입이 조금 명확해 졌지만 유니온 타입 관련해서 문제가 발생함.
순차적으로 일치하는 타입을 찾을 때까지 검색함.

function double(x: number): number
function double(x: string): string
function double(x: any) {
  return x + x
}

const num = double(12) // number
const string = double('x') // string

function f(x: number | string) {
  double(x)
}
*/

function double<T extends string | number>(x: T): T extends string ? string : number
function double(x: any) {
  return x + x
}

const num = double(12) // number
const string = double('x') // string

function f(x: number | string) {
  double(x)
}
