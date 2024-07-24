export function maxProduct(nums: number[]): number {
  let prev = {
    max: nums[0],
    min: nums[0],
  };
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const val = nums[i];
    let tMin = Math.min(val, prev.max * val, prev.min * val);
    let tMax = Math.max(val, prev.max * val, prev.min * val);
    max = Math.max(max, tMax);
    prev.min = tMin;
    prev.max = tMax;
  }
  return max;
}
