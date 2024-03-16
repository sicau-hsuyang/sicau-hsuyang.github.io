export function dominantIndex(nums: number[]): number {
  let max = -Infinity;
  let maxIdx = -1;
  for (let i = 0; i < nums.length; i++) {
    const el = nums[i];
    if (max < el) {
      max = el;
      maxIdx = i;
    }
  }
  const flag = nums.every((v) => {
    return v === max || v * 2 <= max;
  });
  return flag ? maxIdx : -1;
}
