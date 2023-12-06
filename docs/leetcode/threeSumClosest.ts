export function threeSumClosest(nums: number[], target: number): number {
  let minAbsDistance = Infinity;
  // 先排序
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length - 1; i++) {
    let left = 0;
    let right = nums.length - 1;
    const sum = nums[left] + nums[right] + nums[i];
    while (left < i && right > i) {
      const currentDistance = Math.abs(sum - target);
      // target是负数，distance是负数
      if (currentDistance < 0 && target < 0) {
      }
      // target是正数，distance是正数
      else if (currentDistance < 0 && target > 0) {
      }
      // target是正数，distance是正数
      else if (currentDistance > 0 && target > 0) {
      }
      // target是负数，distance是正数
      else if (currentDistance > 0 && target < 0) {
      }
      // 如果target是0
      else if (target === 0) {
      }
    }
  }
}
