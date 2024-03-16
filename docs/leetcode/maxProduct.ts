export function maxProduct(nums: number[]): number {
  for (let i = 0; i < 2; i++) {
    let flag = false;
    for (let k = 0; k < nums.length - i; k++) {
      if (nums[k] < nums[k - 1]) {
        let temp = nums[k];
        nums[k] = nums[k - 1];
        nums[k - 1] = temp;
        flag = true;
      }
    }
    if (!flag) {
      break;
    }
  }
  const v1 = nums[nums.length - 1] - 1;
  const v2 = nums[nums.length - 2] - 1;
  return v1 * v2;
}
