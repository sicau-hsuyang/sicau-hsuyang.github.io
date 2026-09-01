function quickSort(arr) {
  _quickSort(arr, 0, arr.length - 1);
}

function _quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let pivot = arr[start];
  let i = start;
  let j = end;
  while (i < j) {
    // 找到比主元小的
    while (i < j && arr[j] > pivot) {
      j--;
    }
    if (i < j) {
      arr[i] = arr[j];
      i++;
    }
    // 找到比主元大的
    while (i < j && arr[i] < pivot) {
      i++;
    }
    if (i < j) {
      arr[j] = arr[i];
      j--;
    }
  }
  arr[i] = pivot;
  _quickSort(arr, start, i - 1);
  _quickSort(arr, i + 1, end);
}