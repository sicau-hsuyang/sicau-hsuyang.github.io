export function maxTurbulenceSize(arr: number[]): number {
  if (arr.length === 1) {
    return 1;
  }
  let maxDistance = 0;
  let left = -1;
  let shouldBigger = false;
  for (let right = 1; right < arr.length; right++) {
    const preNum = arr[right - 1];
    const curNum = arr[right];
    // 如果还没有开始
    if (left === -1) {
      // 当前来的是奇数，即前面一个是偶数
      if (right % 2 === 1 && preNum > curNum) {
        // 从前面的位置开始即
        left = right - 1;
        shouldBigger = true;
      }
      // 当前来的是偶数，即前面一个是奇数
      else if (right % 2 === 0 && curNum > preNum) {
      }
    }
  }
  return maxDistance;
}
