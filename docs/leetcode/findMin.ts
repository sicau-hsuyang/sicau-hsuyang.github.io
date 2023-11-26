export function findMin(nums: number[]): number {
  return _find(nums, 0, nums.length - 1);
}

function _find(nums: number[], left: number, right: number) {
  if (left === right) {
    return nums[left];
  }
  const mid = Math.floor((right + left) / 2);
  const isLeftSorted = nums[left] <= nums[mid];
  const isRightSorted = nums[mid + 1] <= nums[right];
  // 左右两边片段都是有序的，并且左边片段的初始值要比右边片段的第一个值小
  const searchInLeft =
    isRightSorted && isLeftSorted && nums[left] <= nums[right];
  // 左边片段不是有序的，并且右边一定不能也是有序的，左边的第一个值比右边的最后一个值要大
  const searchNotInRightPart =
    isRightSorted && !isLeftSorted && nums[left] >= nums[mid + 1];
  if (searchInLeft || searchNotInRightPart) {
    return _find(nums, left, mid);
  } else {
    return _find(nums, mid + 1, right);
  }
}
