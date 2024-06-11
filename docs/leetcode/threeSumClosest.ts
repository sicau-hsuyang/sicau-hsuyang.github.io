export function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => {
    return a - b;
  });
  let len = nums.length;
  let distance = Number.MAX_VALUE;
  let sum!: number;
  for (let i = 1; i < len - 1; i++) {
    let left = 0;
    let right = len - 1;
    let leftVal = nums[left];
    let rightVal = nums[right];
    while (left < i && right > i) {
      let tempSum = leftVal + nums[i] + rightVal;
      // 如果tempSum 比target小的话，从左侧趋近target
      if (tempSum < target) {
        const tempDistance = target - tempSum;
        // 如果小的稍显合适，则尝试更新，否则，只有可能把当前的数变大才有可能得到更优的解
        if (tempDistance < distance) {
          distance = tempDistance;
          sum = tempSum;
        }
        left++;
        leftVal = nums[left];
      } else {
        // 否则是比target大，从右侧趋近target
        const tempDistance = tempSum - target;
        // 如果大的稍显合适，则尝试更新，否则，只有可能把当前的数变小才有可能得到更优的解
        if (tempDistance < distance) {
          distance = tempDistance;
          sum = tempSum;
        }
        right--;
        rightVal = nums[right];
      }
    }
    // 最好的case，刚好找到了一个完全相等的解
    if (distance === 0) {
      break;
    }
  }
  return sum;
}
