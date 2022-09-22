import { swap } from './utils/swap'

/**
 * (가정 1) 오름차순으로 정렬한다.
 * (가정 2) 배열은 양의 자연수만 가진다.
 *
 * "거품이 가장 위로 떠오르는 듯한" 정렬 방식
 * 여기서 거품이란 오름차순이니 가장 큰 값. 가장 큰 값을 하나씩 맨뒤로 밀어냄(떠오르게함)
 * 거품은 한꺼번에 여러 단계를 떠오를 수 없고 인접한 높이의 거품 두 개를 비교해서 큰 거품을 위로 떠오르게함
 */
export function bubbleSort(array: number[]) {
  if (array.length < 2) {
    return array
  }

  for (let i = 0; i < array.length; ++i) {
    for (let j = 0; j < array.length - i - 1; ++j) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }

  return array
}
