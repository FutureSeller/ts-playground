interface User {
  id: number
  name: string
  email: string
  job: 'engineer'
}

/**
 *  Note 1: Type Assertion (타입 표명)
 *  - extra property check를 해주지 않음
 */

// non-error: 프로퍼티가 없는 경우에 잡아주지 않음
const userA = {
  id: 1,
} as User

// non-error: 다른 프로퍼티가 추가되어도 잡아주지 않음
const userB = {
  id: 1,
  name: '123',
  email: 'asdfasdf@asdf.com',
  job: 'engineer',
  extraProperty: 'hello',
} as User
// 이와 같은 이유때문에, Object.keys가 keyof typeof Type이 아닌 string[] 배열을 내뱉는 것임.

/**
 *  Note 2: Type Declaration (타입 선언)
 *  - extraProeprty check를 해줌
 */

// error: extraProperty가 존재하면 안됨
const userC: User = {
  id: 1,
  name: '123',
  email: 'adsfasdf@asdf.com',
  job: 'engineer',
  extraProperty: 'hello',
}

// error: job이 필요함
const userC: User = {
  id: 1,
  name: '123',
  email: 'adsfasdf@asdf.com',
}

// Note 3: Double Assertion (이중 표명)
function handler(event: Event) {
  const mouseEvent1 = event as HTMLElement // error: 호환되지 않기때문
  const mouseEvent2 = event as unknown as HTMLElement // narrowing한 뒤, assertion을 한번 더 하는 것
  const mounseEvent3 = event as any as HTMLElement // unknown대신 any를 써도 무방하나, lint가 귀찮게 할 수 있음.
}
