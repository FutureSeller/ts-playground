export function swap(array: Array<any>, a: number, b: number) {
  const temp = array[b]
  array[b] = array[a]
  array[a] = temp
}
