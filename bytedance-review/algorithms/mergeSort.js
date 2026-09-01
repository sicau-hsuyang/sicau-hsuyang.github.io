function mergeSort(arr) {
  _mergeSort(arr, 0, arr.length - 1);
}

function _merge(arr, left, rightStart, right, tmpArr) {
  let N = right - left + 1;
  let leftEnd = rightStart - 1;
  let offset1 = left;
  let offset2 = rightStart;
  let k = left;
  while (offset1 <= leftEnd && offset2 <= right) {
    if (arr[offset1] >= arr[offset2]) {
      tmpArr[k++] = arr[offset2++];
    } else {
      tmpArr[k++] = arr[offset1++];
    }
  }
  while (offset1 <= leftEnd) {
    tmpArr[k++] = arr[offset1++];
  }
  while (offset2 <= right) {
    tmpArr[k++] = arr[offset2++];
  }
  for (let i = 0, o = right; i < N; i++, o--) {
    arr[o] = tmpArr[o];
  }
}

function _mergeSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  const tmpArr = [];
  const mid = Math.floor((l + r) / 2);
  _mergeSort(arr, l, mid);
  _mergeSort(arr, mid + 1, r);
  _merge(arr, l, mid + 1, r, tmpArr);
}
