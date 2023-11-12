export function pivotIndex(nums: number[]): number {
  // 前缀和
  const sum: number[] = [0];
  for (let i = 0; i < nums.length; i++) {
    sum[i + 1] = nums[i] + sum[i];
  }
  let idx = -1;
  for (let i = 0; i < nums.length; i++) {
    if (i === 0 && sum[nums.length] - sum[1] === 0) {
      idx = 0;
      break;
    } else if (i === nums.length - 1 && sum[nums.length - 1] === 0) {
      idx = i;
      break;
    } else {
      const leftSum = sum[i - 1 + 1];
      const rightSum = sum[nums.length - 1 + 1] - sum[i + 1];
      if (leftSum === rightSum) {
        idx = i;
        break;
      }
    }
  }
  return idx;
}
