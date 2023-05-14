export function reversePairs(arr: number[]): number {
  const tmpArr = [];
  return mergeSort(arr, 0, arr.length - 1, tmpArr);
}

function mergeSort(
  arr: number[],
  left: number,
  right: number,
  tempArr: number[]
) {
  if (left >= right) {
    return 0;
  }
  const mid = Math.floor((right + left) / 2);
  const leftCounter = mergeSort(arr, left, mid, tempArr);
  const rightCounter = mergeSort(arr, mid + 1, right, tempArr);
  const mergeCounter = merge(arr, left, mid + 1, right, tempArr);
  return leftCounter + rightCounter + mergeCounter;
}

function merge(
  arr: number[],
  leftStart: number,
  rightStart: number,
  rightEnd: number,
  tempArr: number[]
): number {
  let counter = 0;
  let leftEnd = rightStart - 1;
  let i = leftStart;
  let j = rightStart;
  let pos = leftStart;
  while (i <= leftEnd && j <= rightEnd) {
    if (arr[i] > arr[j]) {
      tempArr[pos++] = arr[j++];
      counter += leftEnd - i + 1;
    } else {
      tempArr[pos++] = arr[i++];
    }
  }
  while (i <= leftEnd) {
    tempArr[pos++] = arr[i++];
  }
  while (j <= rightEnd) {
    tempArr[pos++] = arr[j++];
  }
  let distance = rightEnd - leftStart + 1;
  for (let k = rightEnd, d = distance; d > 0; k--, d--) {
    arr[k] = tempArr[k];
  }
  return counter;
}
