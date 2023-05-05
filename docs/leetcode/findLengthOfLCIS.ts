export function findLengthOfLCIS(nums: number[]): number {
  let maxLength = 1;
  for (let i = 0; i < nums.length; i++) {
    let cur = i + 1;
    let pre = nums[i];
    let now = nums[cur];
    while (cur < nums.length && now > pre) {
      pre = now;
      cur++;
      now = nums[cur];
    }
    let distance = cur - i;
    if (distance > maxLength) {
      maxLength = distance;
    }
  }
  return maxLength;
}
