export function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((accu, n) => {
    return accu + n;
  });
  if (sum % 2 !== 0) {
    return false;
  }
  const halfVal = sum / 2;

  function calc(
    nums: number[],
    memo: number[][],
    offset: number,
    accu: number
  ) {
    // 超出了最大的边界，超出了比较的意义
    if (
      offset >= nums.length ||
      accu > halfVal ||
      accu + nums[offset] > halfVal
    ) {
      return false;
    }
    if (memo[offset][accu] !== undefined) {
      return memo[offset][accu];
    }
    // 相等的情况
    if (accu + nums[offset] === halfVal) {
      return true;
    }
    // 选 or 不选
    const plan1 = calc(nums, memo, offset + 1, accu + nums[offset]);
    const plan2 = calc(nums, memo, offset + 1, accu);
    const res = plan1 || plan2;
    memo[offset][accu] = res;
    return res;
  }

  const memo = Array.from({
    length: nums.length,
  }).map((v) => {
    return Array.from({
      length: halfVal + 1,
    });
  }) as number[][];

  return calc(nums, memo, 0, 0);
}
