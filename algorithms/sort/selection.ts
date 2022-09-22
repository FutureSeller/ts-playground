import { swap } from './utils/swap'

/**
 * (가정 1) 오름차순으로 정렬한다.
 * (가정 2) 배열은 양의 자연수만 가진다.
 *
 * 일렬로 줄 서있는 요소들 중 "가장 작은 녀석을 선택해서" 맨 앞부터 채옴
 * e.g. 10명의 사람을 키순으로 줄 세울때, 제일 작은녀석 맨앞! 그 다음녀석! 그 다음녀석! 의 반복으로 맨 앞부터 줄을 세움
 */
export function selectionSort(array: number[]) {
  if (array.length < 2) {
    return array
  }

  let minIndex = -1
  for (let i = 0; i < array.length; ++i) {
    minIndex = i
    for (let j = i + 1; j < array.length; ++j) {
      if (array[minIndex] > array[j]) {
        minIndex = j
      }
    }

    if (i !== minIndex) {
      swap(array, i, minIndex)
    }
  }

  return array
}
