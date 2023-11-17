export function longestOnes(nums: number[], k: number): number {
  const prefixSumCount: Map<number, number> = new Map();
  let prefixSum = 0;
  let max = 0;
  // TODO: 设置一个起点
  // prefixSumCount.set(0, )
  for (let i = 0; i < nums.length; i++) {
    const number = nums[i];
    prefixSum += number;
    const idx = prefixSumCount.get(prefixSum + k);
    if (idx) {
      const distance = i - idx;
      if (max < distance) {
        max = distance;
      }
    } else {
      // 设置当前前缀和的索引位置
      prefixSumCount.set(prefixSum, i);
    }
  }
  return max;
}
