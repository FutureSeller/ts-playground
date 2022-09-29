export const mobilePhoneRegex = /^01(0|1|6|7|8|9)-\d{3,4}-\d{4}$/

export const formatMobilePhoneNumber = (mobilePhoneNumber: string, format = '$1-$2-$3') => {
  return mobilePhoneNumber.replace(/^(01[0|1|6|7|8|9])(\d{3,4})(\d{4})$/, format)
}

// Reference: https://regex101.com/r/UBxDX1/1
export const mobilePhoneWithCountryCodeRegex =
  /(?<countryCode>\+?82)?(?:[ -.]?|0?)(?<areaCode>1[016789])(?:[ -.]?)(?<firstFourDigits>\d{3,4})(?:[ -.]?)(?<lastFourDigits>\d{4})/

export const telephoneRegex = /^0(2|31|32|33|41|42|43|44|51|52|53|54|55|61|62|63|64)-\d{3,4}-\d{4}$/

export const formatTelephoneNumber = (telephoneNumber: string, format = '$1-$2-$3') => {
  const regex = /^(?<areaCode>0(?:2|[3-6]{1}[1-5]{1}))(?<firstFourDigits>\d{3,4})(?<lastFourDigits>\d{4})$/
  const matched = telephoneNumber.match(regex)

  if (matched == null) {
    return telephoneNumber
  }

  switch (matched?.groups?.areaCode) {
    case '02':
    case '031':
    case '032':
    case '033':
    case '041':
    case '042':
    case '043':
    case '044':
    case '051':
    case '052':
    case '053':
    case '054':
    case '055':
    case '061':
    case '062':
    case '063':
    case '064':
      return telephoneNumber.replace(regex, format)
    default:
      return telephoneNumber
  }
}
