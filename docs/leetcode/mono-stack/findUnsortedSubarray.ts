/**
 * 获取栈顶元素
 * @param nums
 * @returns
 */
function top<T>(nums: T[]): T {
  return nums[nums.length - 1];
}

/**
 * 查找数组的每一个元素右边比它小的最近的元素的列表
 * @param nums
 */
function findMin(nums: number[]): number[] {
  const results = Array.from({
    length: nums.length,
  }).fill(-1) as number[];
  const monoStack: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    while (monoStack.length && nums[top(monoStack)] > num) {
      const pos = monoStack.pop()!;
      // pos这个位置的元素，第一个比它小的就是i这个位置的元素
      results[pos] = i;
    }
    // 将当前元素的索引添加到单调栈中去
    monoStack.push(i);
  }
  return results;
}

/**
 * 查找数组的每一个元素的左边比它大的最近的元素的列表
 * @param nums
 */
function findMax(nums: number[]): number[] {
  const results = Array.from({
    length: nums.length,
  }).fill(-1) as number[];
  const monoStack: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    while (monoStack.length && nums[top(monoStack)] < num) {
      monoStack.pop()!;
    }
    if (monoStack.length) {
      const pos = top(monoStack);
      results[i] = pos;
    }
    // 将当前元素的索引添加到单调栈中去
    monoStack.push(i);
  }
  return results;
}

export function findUnsortedSubarray(nums: number[]): number {
  const maxSequence = findMax(nums);
  let minPos = 0;
  for (let i = 0; i < maxSequence.length; i++) {
    const pos = maxSequence[i];
    if (pos !== -1) {
      minPos = pos;
      break;
    }
  }
  let maxPos = nums.length - 1;
  for (let i = maxSequence.length - 1; i >= 0; i--) {
    const pos = maxSequence[i];
    if (pos !== -1) {
      maxPos = pos;
      break;
    }
  }
  const D = maxPos - minPos + 1;
  return D;
}
