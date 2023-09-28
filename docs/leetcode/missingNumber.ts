export function missingNumber(nums: number[]): number {
  const ref: boolean[] = Array.from({
    length: nums.length + 1,
  });
  for (let i = 0; i <= nums.length; i++) {
    ref[nums[i]] = true;
  }
  for (let i = 0; i < ref.length; i++) {
    if (typeof ref[i] === "undefined") {
      return i;
    }
  }
  return 0;
}
