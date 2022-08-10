# ITEM 45: devDependencies에 typescript와 @types 추가하기

- dependencies: 프로젝트를 실행하는데 필수적인 라이브러리들. 전이 의존성 현상이 있음 (transitive)
- devDependencies: 프로젝트를 개발하고 테스트하는데 사용되지만, 런타임에는 필요 없는 라이브러리들
- peerDependencies: 런타임에 필요하지만, 의존성을 직접 관리하지 않는 라이브러리들 (e.g., 플러그인들)

> 타입스크립트는 개발 도구일 뿐, 타입 정보는 런타임에 존재하지 않기 때문에 일반적으로 devDependencies에 속함

## 모든 타입스크립트 프로젝트에서 공통적으로 고려해야 할 의존성

- 타입스크립트 자체 의존성
  - 팀원들 모두가 동일한 버전을 설치한다는 보장이 없음. -> devDependencies에 포함되면 `npm install`할 때 모두 정확한 버전을 설치할 수 있음
  - `$ npx tsc`를 사용해서 devDependencies에 설치된 타입스크립트 컴파일러를 실행 할 수 있음
- 타입 의존성(@types): 사용하려는 라이브러리에 타입 선언이 포함되어 있지 않더라도 DefinitelyType에서 타입 정보를 얻을 수 있음
  - npm 레지스트리의 `@types` 스코프에 공개됨. 타입 정보만 포함하고 있고 구현체는 포함하지 않음
  - 원본 라이브러리가 dependencies에 있더라도, `@types` 의존성은 devDependencies에 있어야함

---

# ITEM 46: 타입 선언과 관련된 세 가지 버전 이해하기

의존성 관련 추가로 아래 세 가지 사항을 추가로 고려해야함. 세 가지 버전 중 하나라도 맞지 않으면, 의존성과 상관 없어 보이는 곳에서 엉뚱한 오류가 발생할 수 있음.

- 라이브러리의 버전
- 타입 선언(@types)의 버전
- 타입스크립트의 버전

## 라이브러리와 타입 정보의 버전이 별도로 관리되는 방식의 문제점

- 라이브러리를 업데이트 했지만 실수로 타입 선언을 업데이트하지 않은 경우: 특히 하위 호환성이 깨지는 변경이 있다면, 타입 체커를 통과하더라도 런타임 오류가 발 생할 수 있음 -> 보강 기법 활용 혹은 @types에 직접 기여
- 라이브러리보다 타입 버전이 최신 인 경우 -> 타입 선언의 버전을 내리거나, 라이브러리 버전을 올려야 함
- 프로젝트에서 사용하는 타입스크립트 버전보다 라이브러리에서 필요로 하는 타입스크립트 버전이 최신인 경우
  - 타입스크립트 버전을 올리거나,
  - 라이브러리 타입 선언의 버전을 원래대로 내리거나,
  - `declare module` 선언으로 라이브러리의 타입 정보를 없애거나,
- @types 의존성이 중복될 수도 있음

## 번들링하여 타입선언을 포함하는 경우 문제점

일부 라이브러리, 특히 타입스크립트로 작성된 라이브러리들은 자체적으로 타입 선언을 포함(번들링)하게 된다. 보통 `package.json`의 `types`필드에서 `.d.ts` 파일을 가리키도록 되어있음.
버전 불일치 문제를 해결하긴 하는 반면 아래와 같은 문제들이 생ㅇ김

- 번들된 타입 선언에 보강 기법으로 해결할 수 없는 오류가 있는 경우, 공개 시점에는 잘 동작했지만 타입스크립트 버전이 올라가며 오류가 발생하는 경우 문제.
- 프로젝트 내 타입 선언이 다른 라이브러리의 타입 선언에 의존하면 문제. (devDependencies에 포함 되어있기 때문에, 사용자 입장에서는 설치할 이유가 없음. dependencies에 넣고 싶지도 않음.)
- 프로젝트의 과거 버전에 있는 타입 선언에 문제가 있는 경우 과거 버전으로 돌아가서 패치해야함.
- 타입 선언의 패치 업데이트를 자주 하기 어려움.

## Wrapup

- 공식적인 권장사항은 라이브러리가 타입스크립트로 작성된 경우만 타입 선언을 라이브러리에 포함하는 것. 실제로 타입스크립트 컴파일러가 타입 선언을 대신 생성해주기 때문 (`declaration: true`)
- 자바스크립트로 작성된 라이브러리라면 손수 작성한 타입 선언은 오류가 있을 가능성이 높아 잦은 업데이트가 필요해짐

# Item 49: 콜백에서 this에 대한 타입 제공하기

자바스크립트의 this 바인딩 그대로 타입스크립트 역시 모델링하게 됨. 만약 작성 중인 라이브러리에 this를 사용하는 콜백이 있으면, 매개변수에 this를 추가.

```typescript
function addKeyListener(el: HTMLElement, fn: (this: HTMLElement, e: KeyboardEvent) => void) {...}
```

# Item 50: 오버로딩 타입보다는 조건부 타입을 사용하기

유니온에 조건부 타입을 적용하면, 조건부 타입의 유니온으로 분기 되기 때문에 `number | string`의 경우에도 동작함.

```typescript
// (number|string) extends string ? string : number
// -> number extends string ? string : number | string extends string ? string : number
// -> number | string

function double<T extends string | number>(x: T): T extends string ? string : number
function double(x: any) {
  return x + x
}

const num = double(12) // number
const string = double('x') // string

function f(x: number | string) {
  double(x)
}
```
