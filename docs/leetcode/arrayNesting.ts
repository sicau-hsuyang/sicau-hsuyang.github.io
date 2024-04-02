export function arrayNesting(nums: number[]): number {
  let maxLength = -Infinity;
  const map: Map<number, number[]> = new Map();
  for (let i = 0; i < nums.length; i++) {
    const size = calc(nums, nums[i], new Set());
    if (size > maxLength) {
      maxLength = size;
    }
  }
  return maxLength;
}

function calc(
  nums: number[],
  idx: number,
  set: Set<number> = new Set()
): number {
  const val = nums[idx];
  if (set.has(val) || val < 0 || val >= nums.length) {
    return set.size;
  } else {
    set.add(val);
    return calc(nums, val, set);
  }
}
