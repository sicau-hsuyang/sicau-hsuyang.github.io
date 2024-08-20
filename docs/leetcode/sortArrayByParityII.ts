export function sortArrayByParityII(nums: number[]): number[] {
  // 偶数
  let even = 0;
  // 奇数
  let odd = 1;
  while (even < nums.length && odd < nums.length) {
    // 偶数位的不为0
    if (nums[even] % 2 !== 0) {
      let k = nums.length - 1;
      while (nums[k] % 2 !== 0) {
        k--;
      }
      let temp = nums[k];
      nums[k] = nums[even];
      nums[even] = temp;
    }
    even += 2;
    if (nums[odd] % 2 === 0) {
      let k = nums.length - 1;
      while (nums[k] % 2 === 0) {
        k--;
      }
      let temp = nums[k];
      nums[k] = nums[odd];
      nums[odd] = temp;
    }
    odd += 2;
  }
  return nums;
}
