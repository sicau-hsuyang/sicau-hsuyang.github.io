export function findMaxLength(nums: number[]): number {
  const prefixSumCount: Map<number, number> = new Map();
  // 设置一个起点值
  prefixSumCount.set(0, -1);
  let prefixSum = 0;
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    // 替换0成-1，主要是最终好算
    const number = nums[i] === 0 ? -1 : 1;
    // 如果找到了一个是0的位置，那么塘口已经出现了，就是得找到上一次的位置，这个位置到某个位置就是一段满足条件的距离
    prefixSum += number;
    // 上一次还是这么多的位置，有可能是-1， 也有可能是1
    if (prefixSumCount.has(prefixSum)) {
      const idx = prefixSumCount.get(prefixSum)!;
      const distance = i - idx;
      if (max < distance) {
        max = distance;
      }
    } else {
      // 设置本次前缀和的位置
      prefixSumCount.set(prefixSum, i);
    }
  }
  return max;
}
