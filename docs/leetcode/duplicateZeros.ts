/**
 Do not return anything, modify arr in-place instead.
 */
export function duplicateZeros(arr: number[]): void {
  // 去掉每一个都是0的场景，避免复制的效率太低下
  if (arr.every((v) => v === 0)) {
    return;
  }
  // 最后一个元素就算是0也没有任何意义，所以length-2开始
  for (let k = arr.length - 2; k >= 0; k--) {
    const cur = arr[k];
    if (cur !== 0) {
      continue;
    } else {
      let offset = arr.length - 2;
      while (offset >= k + 1) {
        // 将后面一个拷贝给前面一个
        arr[offset + 1] = arr[offset];
        offset--;
      }
      // 直接赋值
      arr[k + 1] = 0;
    }
  }
}
