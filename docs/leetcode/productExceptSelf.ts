export function productExceptSelf(nums: number[]): number[] {
  const sum: number[] = [1];
  let zeroIdx = -1;
  let counter = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      sum[i + 1] = nums[i] * sum[i];
    } else {
      sum[i + 1] = sum[i];
      zeroIdx = i;
      counter++;
    }
  }
  if (counter > 1) {
    return new Array(nums.length).fill(0);
  }
  const results: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const right = sum[nums.length - 1 + 1];
    // 其它位置上有0
    if (zeroIdx != i && zeroIdx !== -1) {
      results[i] = 0;
    }
    // 处理到了0这个位置上
    else if (zeroIdx === i) {
      results[i] = right;
    } else {
      results[i] = right / nums[i];
    }
  }
  return results;
}
