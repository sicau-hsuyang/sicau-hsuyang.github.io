export function sortArrayByParityII(nums: number[]): number[] {
  const mid = nums.length / 2;
  let offset = 0;
  while (offset <= mid) {
    // 左边的元素
    let left = offset;
    // 右边的元素
    let right = nums.length - 1 - offset;
    // 两边都符合
    if (isCondition(nums, left) && isCondition(nums, right)) {
      offset++;
      left = offset;
      right = nums.length - 1 - offset;
    }
    // 左边符合，右边不符合
    else if (isCondition(nums, left) && !isCondition(nums, right)) {
    }
    // 左边不符合，右边符合
    else if (!isCondition(nums, left) && isCondition(nums, right)) {
    }
    // 两边都不符合
    else {
    }
  }
}

function isCondition(nums: number[], offset: number) {
  // 索引是偶数，元素也是偶数，或者索引是奇数，元素也是奇数
  return (
    (nums[offset] % 2 === 0 && offset % 2 === 0) ||
    (nums[offset] % 2 !== 0 && offset % 2 !== 0)
  );
}
