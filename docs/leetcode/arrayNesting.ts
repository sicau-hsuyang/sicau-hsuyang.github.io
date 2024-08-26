export function arrayNesting(nums: number[]): number {
  let maxLength = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      continue;
    }
    const size = calc(nums, nums[i]);
    if (size > maxLength) {
      maxLength = size;
    }
  }
  return maxLength;
}

function calc(nums: number[], idx: number): number {
  const set: Set<number> = new Set();
  let count = 0;
  let preVal = idx;
  let val = nums[idx];
  nums[idx] *= -1;
  while (!set.has(val) && val >= 0 && val < nums.length) {
    set.add(val);
    nums[preVal] *= -1;
    preVal = val;
    val = nums[val];
    count++;
  }
  return count;
}
