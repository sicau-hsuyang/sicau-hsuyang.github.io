export function maxSubarrayLength(nums: number[], k: number): number {
  const windowMap: Map<number, number> = new Map();
  let maxDistance = 0;
  let left = 0;
  let len = nums.length;
  for (let right = 0; right < len; right++) {
    const num = nums[right];
    let count = windowMap.get(num) || 0;
    // 如果新来的元素已经在之前的数组里面出现了K次
    if (count === k) {
      // 因为不能包含当前元素，所以算长度的时候就是right-1-left+1
      // 所以在这个位置就可以先算一下解
      const D = right - left;
      if (D > maxDistance) {
        console.log(nums.slice(left, right));
        maxDistance = D;
      }
      // 在这个数字之前的所有都要丢弃，如果nums[left]就是要丢弃的数字的话，则循环不需要进行
      while (nums[left] !== num) {
        // 消去当前窗口上记录的哈希表的次数
        const time = windowMap.get(nums[left]) || 0;
        windowMap.set(nums[left], time - 1);
        left++;
      }
      // 当然，这个数字自身也需要丢弃
      const time = windowMap.get(nums[left])!;
      windowMap.set(num, time - 1);
      left++;
      count--;
    }
    if (count === 0) {
      windowMap.set(num, 1);
    } else {
      windowMap.set(num, count + 1);
    }
  }
  // 最后不要忘了还有一扳手的case
  const D = len - left;
  if (D > maxDistance) {
    console.log(nums.slice(left, len));
    maxDistance = D;
  }
  return maxDistance;
}
