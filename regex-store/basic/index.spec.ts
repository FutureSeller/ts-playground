describe('basic', () => {
  // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
  test('chracter classes', () => {
    expect(/[0-9a-zA-Z가-힣]/.test('a')).toBe(true) // matches ay one of the enclosed characters
    expect(/[^0-9a-zA-Z가-힣]/.test('a')).toBe(false)

    expect('1234'.match(/\d+/)?.[0]).toEqual('1234')
    expect('1234asdfb'.match(/\D+/)?.[0]).toEqual('asdfb')
    expect(/^.../.exec('I am a boy')?.[0]).toBe('I a')

    expect('He played the King in a8 and she moved her Queen in c2.'.match(/\w\d/g)).toEqual(['a8', 'c2'])
    expect('happy 🙂, confused 😕, sad 😢'.match(/[\u{1F600}-\u{1F64F}]/gu)).toEqual(['🙂', '😕', '😢'])

    expect('015 354 123123 12412124 1234 0000'.match(/\b\d{4}\b/g)).toEqual(['1234', '0000'])

    expect(
      "I'm sure I'm not Ada,' she said, 'for her hair goes in such long ringlets, and mine doesn't go in ringlets at all.".match(
        /\b[aA]\w+/g
      )
    ).toEqual(['Ada', 'and', 'at', 'all'])
  })

  test('disjunction', () => {
    expect('green apple'.match(/(?:green|red)/)?.[0]).toEqual('green')
    expect('red apple'.match(/(?:green|red)/)?.[0]).toEqual('red')
  })

  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions
  // 행이나 단어의 시작, 끝을 나타내는 경계와 어떤식으로든 매치가 가능한 것을 나타내는 다른 패턴 포함
  test('assertions', () => {
    // Boundary assertion: $, ^, \b, \B
    expect('A quick fox'.match(/\w+$/g)).toEqual(['fox'])
    expect('A quick fox'.match(/\b\w+/g)).toEqual(['A', 'quick', 'fox'])

    // Lookahead assertion: "?=" 뒤에 있는 조건이 맞는 문자열을 찾는다.
    expect('A quick fox'.match(/\w+(?= fox)/g)).toEqual(['quick'])
    expect('Jack Sprat'.match(/Jack(?= Sprat|Frost)/g)).toEqual(['Jack'])
    expect('Jack Frost'.match(/Jack(?= Sprat| Frost)/g)).toEqual(['Jack']) // 공백도 하나의 문자로 인식되니 주의해야한다.
    expect('Jack Sprat'.match(/Jack(?=Sprat)/g)).toEqual(null)

    // Negative lookahead assertion
    expect('3.141'.match(/\d+(?!\.)/g)).toEqual(['141']) // 뒤에 점 붙지 않은 연속된 숫자를 매치해주세요

    // Lookbehind assertion: "?<=" 앞에 있는 조건이 맞는 문자열을 찾는다.
    expect('ripe orange A '.match(/(?<=ripe )orange/g)).toEqual(['orange'])
    expect('ripe apple A '.match(/(?<=ripe )orange/g)).toEqual(null)

    // Negative Lookbehind assertion: "?<=" 앞에 있는 조건이 맞는 문자열을 찾는다.
    expect('ripe orange A '.match(/(?<!ripe )orange/g)).toEqual(null)
    expect('good orange A '.match(/(?<!ripe )orange/g)).toEqual(['orange'])
  })

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers
  // Greedy: 기본 quantifier들은 최대한 긴 스트링을 매치하려고 한다
  //    x*: x -> 0 or more
  //    x+: x -> 1 or more
  //    x?: x -> 0 or 1
  //    x{4}: x -> 4
  //    x{4,}: x -> 4 or more
  //    x{1, 3}: x -> 1, 2, 3
  // `?`: 매칭되는대로 바로 멈춘다.
  test('quantifiers', () => {
    expect('ho! hoooooooooo!'.match(/ho{3,}/g)).toEqual(['hoooooooooo'])
    expect('[Unreachable]: codename [red]! []'.match(/\[.*\]/g)).toEqual(['[Unreachable]: codename [red]! []']) // Greedy
    expect('[Unreachable]: codename [red]! []'.match(/\[.*?\]/g)).toEqual(['[Unreachable]', '[red]', '[]']) // Non-Greedy

    expect('<h1>Vite Example</h1>'.match(/<.*>/g)).toEqual(['<h1>Vite Example</h1>'])
    expect('<h1>Vite Example</h1>'.match(/<.*?>/g)).toEqual(['<h1>', '</h1>'])

    expect('Why do not understand what you said'.match(/\b\w{2,3}\b/g)).toEqual(['Why', 'do', 'not', 'you'])
  })

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences
  // (x): Capturing group: x와 매칭되는 것을 기억해둔다. $1 ... $9 까지 넣어둔다.
  // (?<Name>x): Named capturing group: x와 매칭되는 것을 명세한 `<Name>`에 넣어준다.
  // (?:x): Non-capturing group: x와 매칭되는 것을 찾되 기억하지 않는다.
  // \n: Back reference: 그룹 중 n번째로 매칭된 그룹과 같은 녀석을 대입한다.
  // \k<Name>: Named back reference
  test('groups and backreferences', () => {
    const matched = 'This image has a resolution of 1440x900 pixels'.match(/([0-9]+)x([0-9]+)/)
    expect(matched?.[0]).toEqual('1440x900')
    expect(matched?.[1]).toEqual('1440')
    expect(matched?.[2]).toEqual('900')

    const namedCapturingGroup = 'holy moly triangle'.match(/(?<haha>moly)/)
    expect(namedCapturingGroup?.groups?.haha).toBe('moly')
    expect(namedCapturingGroup?.[0]).toBe('moly')

    const nonCapturingGroup = 'holy moly triangle'.match(/(?:moly)/)
    expect(nonCapturingGroup?.[0]).toBe('moly')
    expect(nonCapturingGroup?.[1]).toBe(undefined)

    expect('apple, orange, cherry, peach'.match(/apple(,)\sorange\1/)?.[0]).toBe('apple, orange,')

    const namedBackReference = 'Do you copy? Sir, yes Sir!'.match(/(?<title>\w+), yes \k<title>/) // name backreference는 \k를 써야합니다.
    expect(namedBackReference?.[0]).toBe('Sir, yes Sir')
    expect(namedBackReference?.groups?.title).toBe('Sir')

    const example = `He said: "She's the one!".`
    expect(example.match(/["'](.*?)["']/)?.[0]).toEqual(`"She'`)
    expect(example.match(/(["'])(.*?)\1/)?.[0]).toEqual(`"She's the one!"`) // 뒤에 이어지는 건 첫번째 그룹과 같은 녀석입니다.

    expect('01012341234'.replace(/^(01[0|1|6|7|8|9])(\d{3,4})(\d{4})$/, '$1-$2-$3')).toBe('010-1234-1234')
  })
})
