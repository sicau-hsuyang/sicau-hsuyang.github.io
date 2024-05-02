export function longestSubarray(nums: number[]): number {
  let maxDistance = 0;
  let left = 0;
  let k = -1;
  for (let right = 0; right < nums.length; right++) {
    const num = nums[right];
    // 非0不考虑，直接跳过
    if (num !== 0) {
      continue;
    }
    // 如果还没有删除这个元素，则尝试删除，记住删除的这个索引位置
    if (k < 0) {
      k = right;
    }
    // 如果已经删除过了
    else {
      // 因为当前来的这个位置也是不要的，因为本来长度是right-left+1,因为删除了一个减去1，并且这个位置不参与计算，所以还要减去1
      let D = right - left - 1;
      if (D > maxDistance) {
        console.log(nums.slice(left, right));
        maxDistance = D;
      }
      // 将left移动到k这个位置的下一个位置
      left = k + 1;
      // 重置k
      k = right;
    }
  }
  // 窗口最后的状态，再比较一下
  if (k != -1) {
    let D = nums.length - 1 - left;
    if (D > maxDistance) {
      maxDistance = D;
    }
  }
  // 如果全部是1，无论如何也要删除1个元素
  else if (k === -1 && left === 0) {
    maxDistance = nums.length - 1;
  }
  return maxDistance;
}
