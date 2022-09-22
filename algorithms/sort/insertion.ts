/**
 * (가정 1) 오름차순으로 정렬한다.
 * (가정 2) 배열은 양의 자연수만 가진다.
 *
 * "정렬된 부분배열 중에 나보다 작은 요소의 위치를 찾은 뒤, 그 요소 뒤에 끼워넣는" 정렬 방식
 */

export function insertionSort(array: number[]) {
  if (array.length < 2) {
    return array
  }

  for (let i = 1; i < array.length; ++i) {
    const temp = array[i]

    let j = i - 1
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = temp
  }

  return array
}
