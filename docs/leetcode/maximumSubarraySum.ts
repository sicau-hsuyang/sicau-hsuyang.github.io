export function maximumSubarraySum(nums: number[], k: number): number {
  let maxSum = 0;
  // const windowMap: Map<number, number> = new Map();
  const windowMap: Record<number, number> = {};
  let sum = 0;
  let hashSize = 0;
  for (let i = 0; i < k; i++) {
    const num = nums[i];
    const count = windowMap[num] || 0;
    if (count === 0) {
      hashSize++;
      windowMap[num] = 1;
    } else {
      windowMap[num] = count + 1;
    }
    sum += num;
  }
  // 如果记录窗口的哈希表记录数和k一致，说明没有重复的元素
  if (hashSize === k) {
    maxSum = sum;
  }
  let left = 0;
  for (let i = k; i < nums.length; i++) {
    const leftNum = nums[left];
    const rightNum = nums[i];
    const leftNumCount = windowMap[leftNum];
    // 如果只有一个元素，直接删除
    if (leftNumCount === 1) {
      Reflect.deleteProperty(windowMap, leftNum);
      hashSize--;
    } else {
      // 否则，从哈希表中移除一个元素
      windowMap[leftNum] = leftNumCount - 1;
    }
    // 可能没有
    const rightNumCount = windowMap[rightNum] || 0;
    if (rightNumCount === 0) {
      windowMap[rightNum] = 1;
      hashSize++;
    } else {
      windowMap[rightNum] = rightNumCount + 1;
    }
    sum -= leftNum;
    sum += rightNum;
    left++;
    // 没有元素重复，并且大于当前记录的最大值
    if (sum > maxSum && hashSize === k) {
      // console.log(nums.slice(left, i + 1));
      maxSum = sum;
    }
  }
  return maxSum;
}
