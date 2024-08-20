export function findPeakElement(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;
  let mid = Math.floor((left + right) / 2);
  while (left + 1 < right) {
    console.log(nums.slice(left, right + 1));
    // 右边的元素比左边的大，峰值在右边
    if (nums[mid] < nums[mid + 1]) {
      left = mid;
    } else {
      right = mid;
    }
    mid = Math.floor((left + right) / 2);
  }
  return nums[left] > nums[right] ? left : right;
}
