export function longestAlternatingSubarray(
  nums: number[],
  threshold: number
): number {
  let maxDistance = 0;
  let left = -1;
  let len = nums.length;
  for (let right = 0; right < len; right++) {
    const num = nums[right];
    // 如果有值超过了阈值，重新计算长度
    if (num > threshold) {
      // 如果还没有窗口，就什么都不用考虑
      if (left != -1) {
        // 扣除几个数
        const D = right - left;
        if (D > maxDistance) {
          console.log(nums.slice(left, right));
          maxDistance = D;
        }
        left = -1;
      }
      continue;
    }
    // 当前进入窗口的是奇数
    const isOddNum = num % 2 !== 0;
    // 若没有开启窗口，进入的是奇数，直接跳过
    if (isOddNum && left === -1) {
      continue;
    }
    // 若没有开启窗口，遇到偶数，开启窗口
    if (!isOddNum && left === -1) {
      left = right;
      continue;
    }
    // 当前距离窗口开始的位置
    const pos = right - left;
    // 当前进入窗口被要求应该是奇数还是偶数
    const isOdd = pos % 2 !== 0;

    // 当前要求进入窗口的是奇数，来的是奇数，什么都可以不用管
    if (isOdd && !isOddNum) {
      const D = right - left;
      // 则前面的那个奇数不行，需要扣除
      if (D > maxDistance) {
        console.log(nums.slice(left, right));
        maxDistance = D;
      }
      // 并且重新开启窗口
      left = right;
    }
    // 当前要求进入窗口的是偶数，来的是偶数，什么都可以不用管
    else if (!isOdd && isOddNum) {
      const D = right - left;
      // 则前面的那个奇数不行，需要扣除
      if (D > maxDistance) {
        console.log(nums.slice(left, right));
        maxDistance = D;
      }
      // 则当前这个偶数不行，需要扣除
      left = -1;
    }
  }
  // 最后再算一次
  if (left !== -1) {
    const D = len - left;
    if (D > maxDistance) {
      console.log(nums.slice(left, len));
      maxDistance = D;
    }
  }
  return maxDistance;
}
