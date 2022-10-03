import { Expect, Equal } from '../type-challenges/types/utility'

// union and intersection types
type unknownCases = [
  Expect<Equal<number | unknown, unknown>>,
  Expect<Equal<number & unknown, number>>,
  Expect<Equal<any & unknown, any>>,
  Expect<Equal<any | unknown, any>>
]
type anyCases = [Expect<Equal<number | any, any>>, Expect<Equal<number & any, any>>]

// unknown type needs type guards: 정적으로는 알 수 없으니, 런타임에 가드하세요.
{
  const isNumber = (value: unknown): value is number => typeof value === 'number'

  const unknownNumbervalue: unknown = 10
  unknownNumbervalue.toFixed(2)
  unknownNumbervalue()
  unknownNumbervalue.props.y

  if (isNumber(unknownNumbervalue)) {
    unknownNumbervalue.toFixed(2)
  }
}

// any type ignore: 정적인 typecheck 시간에 아무일도 해주지 않는다.
{
  const anyNumberValue: any = 10
  anyNumberValue.toFixed(2)
  anyNumberValue()
  anyNumberValue.props.y
}
