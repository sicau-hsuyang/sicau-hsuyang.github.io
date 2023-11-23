export function search(nums: number[], target: number): number {
  return searchHelper(nums, target, 0, nums.length - 1);
}

function searchHelper(
  nums: number[],
  target: number,
  left: number,
  right: number
) {
  // 空数组
  if (right < left) {
    return -1;
  }
  //  数组只有一个元素
  if (right === left) {
    return target === nums[left] ? left : -1;
  }
  // 数组有两个元素
  else if (right - left === 1) {
    if (target === nums[left]) {
      return left;
    } else if (target === nums[right]) {
      return right;
    } else {
      return -1;
    }
  }
  // 数组有多余2个元素
  else {
    const mid = Math.floor((right + left) / 2);
    let result: number;
    // 如果满足这个条件的话，有序序列是在左边
    const whenLeftOrdered = nums[left] <= nums[mid];
    // 如果满足这个条件的话，有序序列在右边
    const whenRightOrdered = nums[mid + 1] <= nums[right];
    // 一半有序
    // 如果左边是有序序列，并且在左边的序列里面，
    const inLeftOrder =
      whenLeftOrdered && target >= nums[left] && target <= nums[mid];
    // 如果左边不是有序序列，那么右边肯定是有序序列，但是却不在有序序列内
    const inLeftInOrder =
      whenRightOrdered && (target < nums[mid + 1] || target > nums[right]);
    if (inLeftOrder || inLeftInOrder) {
      result = searchHelper(nums, target, left, mid);
    } else {
      result = searchHelper(nums, target, mid + 1, right);
    }
    return result;
  }
}
