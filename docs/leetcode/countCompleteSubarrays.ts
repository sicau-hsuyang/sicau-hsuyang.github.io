export function countCompleteSubarrays(nums: number[]): number {
  const set = new Set(nums);
  const uniqueCount = set.size;
  let left = 0;
  let total = 0;
  const len = nums.length;
  const windowMap: Map<number, number> = new Map();
  for (let right = 0; right < len; right++) {
    const num = nums[right];
    const count = windowMap.get(num) || 0;
    if (count === 0) {
      windowMap.set(num, 1);
    } else {
      windowMap.set(num, count + 1);
    }
    // 如果此刻窗口中的内容已经有这么多个
    while (windowMap.size === uniqueCount) {
      let offset = right;
      while (offset < len && windowMap.has(nums[offset])) {
        console.log(nums.slice(left, offset + 1));
        offset++;
        total++;
      }
      const removeNum = nums[left];
      const removeNumCount = windowMap.get(removeNum) || 0;
      if (removeNumCount === 1) {
        windowMap.delete(removeNum);
      } else {
        windowMap.set(removeNum, removeNumCount - 1);
      }
      left++;
    }
  }
  return total;
}
