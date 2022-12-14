describe('basic', () => {
  // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
  test('chracter classes', () => {
    expect(/[0-9a-zA-Zκ°-ν£]/.test('a')).toBe(true) // matches ay one of the enclosed characters
    expect(/[^0-9a-zA-Zκ°-ν£]/.test('a')).toBe(false)

    expect('1234'.match(/\d+/)?.[0]).toEqual('1234')
    expect('1234asdfb'.match(/\D+/)?.[0]).toEqual('asdfb')
    expect(/^.../.exec('I am a boy')?.[0]).toBe('I a')

    expect('He played the King in a8 and she moved her Queen in c2.'.match(/\w\d/g)).toEqual(['a8', 'c2'])
    expect('happy π, confused π, sad π’'.match(/[\u{1F600}-\u{1F64F}]/gu)).toEqual(['π', 'π', 'π’'])

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
  // νμ΄λ λ¨μ΄μ μμ, λμ λνλ΄λ κ²½κ³μ μ΄λ€μμΌλ‘λ  λ§€μΉκ° κ°λ₯ν κ²μ λνλ΄λ λ€λ₯Έ ν¨ν΄ ν¬ν¨
  test('assertions', () => {
    // Boundary assertion: $, ^, \b, \B
    expect('A quick fox'.match(/\w+$/g)).toEqual(['fox'])
    expect('A quick fox'.match(/\b\w+/g)).toEqual(['A', 'quick', 'fox'])

    // Lookahead assertion: "?=" λ€μ μλ μ‘°κ±΄μ΄ λ§λ λ¬Έμμ΄μ μ°Ύλλ€.
    expect('A quick fox'.match(/\w+(?= fox)/g)).toEqual(['quick'])
    expect('Jack Sprat'.match(/Jack(?= Sprat|Frost)/g)).toEqual(['Jack'])
    expect('Jack Frost'.match(/Jack(?= Sprat| Frost)/g)).toEqual(['Jack']) // κ³΅λ°±λ νλμ λ¬Έμλ‘ μΈμλλ μ£Όμν΄μΌνλ€.
    expect('Jack Sprat'.match(/Jack(?=Sprat)/g)).toEqual(null)

    // Negative lookahead assertion
    expect('3.141'.match(/\d+(?!\.)/g)).toEqual(['141']) // λ€μ μ  λΆμ§ μμ μ°μλ μ«μλ₯Ό λ§€μΉν΄μ£ΌμΈμ

    // Lookbehind assertion: "?<=" μμ μλ μ‘°κ±΄μ΄ λ§λ λ¬Έμμ΄μ μ°Ύλλ€.
    expect('ripe orange A '.match(/(?<=ripe )orange/g)).toEqual(['orange'])
    expect('ripe apple A '.match(/(?<=ripe )orange/g)).toEqual(null)

    // Negative Lookbehind assertion: "?<=" μμ μλ μ‘°κ±΄μ΄ λ§λ λ¬Έμμ΄μ μ°Ύλλ€.
    expect('ripe orange A '.match(/(?<!ripe )orange/g)).toEqual(null)
    expect('good orange A '.match(/(?<!ripe )orange/g)).toEqual(['orange'])
  })

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers
  // Greedy: κΈ°λ³Έ quantifierλ€μ μ΅λν κΈ΄ μ€νΈλ§μ λ§€μΉνλ €κ³  νλ€
  //    x*: x -> 0 or more
  //    x+: x -> 1 or more
  //    x?: x -> 0 or 1
  //    x{4}: x -> 4
  //    x{4,}: x -> 4 or more
  //    x{1, 3}: x -> 1, 2, 3
  // `?`: λ§€μΉ­λλλλ‘ λ°λ‘ λ©μΆλ€.
  test('quantifiers', () => {
    expect('ho! hoooooooooo!'.match(/ho{3,}/g)).toEqual(['hoooooooooo'])
    expect('[Unreachable]: codename [red]! []'.match(/\[.*\]/g)).toEqual(['[Unreachable]: codename [red]! []']) // Greedy
    expect('[Unreachable]: codename [red]! []'.match(/\[.*?\]/g)).toEqual(['[Unreachable]', '[red]', '[]']) // Non-Greedy

    expect('<h1>Vite Example</h1>'.match(/<.*>/g)).toEqual(['<h1>Vite Example</h1>'])
    expect('<h1>Vite Example</h1>'.match(/<.*?>/g)).toEqual(['<h1>', '</h1>'])

    expect('Why do not understand what you said'.match(/\b\w{2,3}\b/g)).toEqual(['Why', 'do', 'not', 'you'])
  })

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences
  // (x): Capturing group: xμ λ§€μΉ­λλ κ²μ κΈ°μ΅ν΄λλ€. $1 ... $9 κΉμ§ λ£μ΄λλ€.
  // (?<Name>x): Named capturing group: xμ λ§€μΉ­λλ κ²μ λͺμΈν `<Name>`μ λ£μ΄μ€λ€.
  // (?:x): Non-capturing group: xμ λ§€μΉ­λλ κ²μ μ°Ύλ κΈ°μ΅νμ§ μλλ€.
  // \n: Back reference: κ·Έλ£Ή μ€ nλ²μ§Έλ‘ λ§€μΉ­λ κ·Έλ£Ήκ³Ό κ°μ λμμ λμνλ€.
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

    const namedBackReference = 'Do you copy? Sir, yes Sir!'.match(/(?<title>\w+), yes \k<title>/) // name backreferenceλ \kλ₯Ό μ¨μΌν©λλ€.
    expect(namedBackReference?.[0]).toBe('Sir, yes Sir')
    expect(namedBackReference?.groups?.title).toBe('Sir')

    const example = `He said: "She's the one!".`
    expect(example.match(/["'](.*?)["']/)?.[0]).toEqual(`"She'`)
    expect(example.match(/(["'])(.*?)\1/)?.[0]).toEqual(`"She's the one!"`) // λ€μ μ΄μ΄μ§λ κ±΄ μ²«λ²μ§Έ κ·Έλ£Ήκ³Ό κ°μ λμμλλ€.

    expect('01012341234'.replace(/^(01[0|1|6|7|8|9])(\d{3,4})(\d{4})$/, '$1-$2-$3')).toBe('010-1234-1234')
  })
})
