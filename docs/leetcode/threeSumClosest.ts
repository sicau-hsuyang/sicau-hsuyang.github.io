export function threeSumClosest(nums: number[], target: number): number {
  // 最终的最小距离
  let minDistance = Infinity;
  let targetSum = Infinity;
  for (let i = 1; i < nums.length - 1; i--) {
    let left = 0;
    let right = nums.length - 1;
    let leftVal = nums[left];
    let rightVal = nums[right];
    let midVal = nums[i];
    let sum = leftVal + midVal + rightVal;
    // 本轮的最小距离
    let currentDistance = Math.abs(sum - target);
    let currentTargetSum = sum;
    while (left < i && right > i) {

    }
    if (currentDistance < minDistance) {
      targetSum = currentTargetSum;
      minDistance = currentDistance;
    }
  }
  return target;
}
