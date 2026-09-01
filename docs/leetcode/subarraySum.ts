export function subarraySum(nums: number[], k: number) {
  const map: Map<number, number> = new Map();
  // 主要是为了初始化一个标记
  map.set(0, 1);
  let prefixSum = 0;
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    const count = map.get(prefixSum - k) || 0;
    total += count;
    const posCount = map.get(prefixSum) || 0;
    if (!posCount) {
      map.set(prefixSum, 1);
    } else {
      map.set(prefixSum, posCount + 1);
    }
  }
  return total;
}
