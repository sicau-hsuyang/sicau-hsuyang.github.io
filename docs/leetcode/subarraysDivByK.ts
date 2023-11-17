export function subarraysDivByK(nums: number[], k: number): number {
  const prefixSumCount: Map<number, number> = new Map();
  prefixSumCount.set(0, 1);
  let result = 0;
  let prefixSum = 0;
  for (let i = 0; i < nums.length; i++) {
    const number = nums[i];
    prefixSum += number;
    const counter1 = prefixSumCount.get(prefixSum) || 0;
    if (counter1) {
      result += counter1;
    }
    const counter = prefixSumCount.get(prefixSum % k) || 0;
    if (counter) {
      // console.log(prefixSum, number, counter1, counter);
      result += counter;
    }
    const prev = prefixSumCount.get(prefixSum) || 0;
    prefixSumCount.set(prefixSum, prev + 1);
  }
  return result;
}
