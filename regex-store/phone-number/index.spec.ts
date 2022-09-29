import { mobilePhoneRegex, formatMobilePhoneNumber, telephoneRegex, formatTelephoneNumber } from '.'

describe('korean phone number regex', () => {
  describe('mobilePhoneRegex', () => {
    test.each([
      ['010-0000-0000', true],
      ['011-0000-0000', true],
      ['016-0000-0000', true],
      ['017-0000-0000', true],
      ['018-0000-0000', true],
      ['019-0000-0000', true],
      ['010-000-0000', true],
      ['011-000-0000', true],
      ['016-000-0000', true],
      ['017-000-0000', true],
      ['018-000-0000', true],
      ['019-000-0000', true],
      ['010-0000-00000', false], // fail: 마지막이 5자리
      ['010-0000-000', false], // fail: 마지막이 3자리
      ['01-0000-000', false], // fail: 앞자리가 2자리
      ['010000000', false], // fail: 구분자가 없는 경우
      ['not a number', false], // fail: 영어
    ])(`mobile-phone-with-delemiter: given %p as arguments, returns %p`, (value, oracle) => {
      expect(mobilePhoneRegex.test(value)).toBe(oracle)
    })
  })

  describe('formatMobilePhoneNumber', () => {
    test.each([
      ['01000000000', '$1-$2-$3', '010-0000-0000'],
      ['0100000000', '$1-$2-$3', '010-000-0000'],
      ['0100000000', '($1)$2-$3', '(010)000-0000'],
      ['0100000000', '($1)$2$3', '(010)0000000'],
      ['0100000000', '($1)$2.$3', '(010)000.0000'],
      ['010000000000', '$1-$2-$3', '010000000000'], // fail: 길이가 김
      ['010000000', '$1-$2-$3', '010000000'], // fail: 길이가 짧음
      ['02000000000', '$1-$2-$3', '02000000000'], // 유효하지 않은 앞자리 (020)
      ['not a number', '$1-$2-$3', 'not a number'], // fail: 숫자가 아님
    ])(`formatMobilePhoneNumber: given %p as arguments, returns %p`, (value, format, oracle) => {
      expect(formatMobilePhoneNumber(value, format)).toEqual(oracle)
    })
  })

  describe('telephoneRegex', () => {
    test.each([
      ['02-0000-0000', true],
      ['031-0000-0000', true],
      ['032-0000-0000', true],
      ['033-0000-0000', true],
      ['041-0000-0000', true],
      ['042-0000-0000', true],
      ['043-0000-0000', true],
      ['044-0000-0000', true],
      ['051-0000-0000', true],
      ['052-0000-0000', true],
      ['053-0000-0000', true],
      ['054-0000-0000', true],
      ['055-0000-0000', true],
      ['061-0000-0000', true],
      ['062-0000-0000', true],
      ['063-0000-0000', true],
      ['064-0000-0000', true],
      ['065-0000-0000', false], // 없는 지역번호
      ['not a number', false], // fail: 영어
    ])(`telephone-with-delemiter: given %p as arguments, returns %p`, (value, oracle) => {
      expect(telephoneRegex.test(value)).toBe(oracle)
    })
  })

  describe('formatTelephoneNumber', () => {
    test.each([
      ['020000000', '$1-$2-$3', '02-000-0000'],
      ['0210000000', '$1-$2-$3', '02-1000-0000'],
      ['02100000000', '$1-$2-$3', '02100000000'],
      ['03200000000', '$1-$2-$3', '032-0000-0000'],
      ['0100000000', '$1-$2-$3', '0100000000'],
      ['0330000000', '($1)$2-$3', '(033)000-0000'],
      ['0640000000', '($1)$2$3', '(064)0000000'],
      ['0100000000', '($1)$2.$3', '0100000000'],
      ['06500000000', '($1)$2.$3', '06500000000'], // 없는 지역번호
      ['02000000000', '$1-$2-$3', '02000000000'], // fail: 길이가 김
      ['02000000', '$1-$2-$3', '02000000'], // fail: 길이가 짧음
      ['not a number', '$1-$2-$3', 'not a number'], // fail: 숫자가 아님
    ])(`formatTelephoneNumber: given %p as arguments, returns %p`, (value, format, oracle) => {
      expect(formatTelephoneNumber(value, format)).toBe(oracle)
    })
  })
})
