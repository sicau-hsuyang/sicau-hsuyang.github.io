// function accumulate(arr: number[], init = 0) {
//   return arr.reduce((t, i) => {
//     return t + i;
//   }, init);
// }

function calc(nums: number[], sum: number, target: number): number {
  if (nums.length === 1) {
    // 正0 和负0都可以的
    if (sum + nums[0] === target && sum - nums[0] === target) {
      return 2;
    } else if (sum + nums[0] === target) {
      return 1;
    } else if (sum - nums[0] === target) {
      return 1;
    } else {
      return 0;
    }
  } else {
    const val = nums[0];
    const nextArr = nums.slice(1);
    const plan1Result = calc(nextArr, sum + val, target);
    const plan2Result = calc(nextArr, sum - val, target);
    return plan1Result + plan2Result;
  }
}

export function findTargetSumWays(nums: number[], target: number): number {
  const total = calc(nums, 0, target);
  return total;
}
