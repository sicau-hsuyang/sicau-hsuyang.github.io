/**
 * @param {number[]} nums
 * @return {number}
 */
export function rob(nums: number[]) {
  if(nums.length === 1) {
    return nums[0]
  }
  let A = nums[0];
  let B = Math.max(A, nums[1]);
  for (let i = 2; i < nums.length; i++) {
    let cur = nums[i];
    let sum = Math.max(A + cur, B);
    A = B;
    B = sum;
  }
  return B;
}

/**


F1 = 1
F2 = max{1, 2}
F3 = max{F(1) + 3, F(2)}
F4 = max{F(3) + 1, F(3)}

 */
