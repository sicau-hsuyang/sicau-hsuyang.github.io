export function subarraySum(nums: number[], k: number) {
  const prefixSumCount: Map<number, number> = new Map();
  // 如果自己恰好跟k相同的话，这也是要算作一次的
  prefixSumCount.set(0, 1);
  let prefixSum = 0;
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    const number = nums[i];
    prefixSum += number;
    // 往前面跳多少次，比如前面有多少个和为-2的记录，假设 我们可以想象，假设有有2个记录，这两个段分别是A和B，可以得出A+B段到现在这个位置和为K，
    // 另外一个是B到现在这个段的位置的和为K，所以一下就可以算出来2个段
    const count = prefixSumCount.get(prefixSum - k);
    if (count) {
      result += count;
    }
    const preCount = prefixSumCount.get(prefixSum) || 0;
    prefixSumCount.set(prefixSum, preCount + 1);
  }
  return result;
}
