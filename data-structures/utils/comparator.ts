// Reference: https://github.com/trekhleb/javascript-algorithms
export type CompareFunctionType<T> = (a: T, b: T) => 0 | -1 | 1

export class Comparator<T> {
  private compare: CompareFunctionType<T>

  constructor(compareFunction?: CompareFunctionType<T>) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  static defaultCompareFunction<T>(a: T, b: T) {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  equal(a: T, b: T) {
    return this.compare(a, b) === 0
  }

  lessThan(a: T, b: T) {
    return this.compare(a, b) < 0
  }

  lessThanEqual(a: T, b: T) {
    return this.compare(a, b) <= 0
  }

  greaterThan(a: T, b: T) {
    return this.compare(a, b) > 0
  }

  greaterThanEqual(a: T, b: T) {
    return this.compare(a, b) >= 0
  }

  reverse() {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}
