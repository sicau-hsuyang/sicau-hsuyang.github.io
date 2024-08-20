export function singleNonDuplicate(nums: number[]): number {
  let n = nums.length;
  let left = 0;
  let right = n - 1;
  let mid = Math.floor((left + right) / 2);
  while (left < right) {
    // console.log(nums.slice(left, right + 1));
    if (nums[mid] !== nums[mid + 1] && nums[mid] !== nums[mid - 1]) {
      break;
    }
    // 右边有偶数个，则单的那个数在左边
    else if (
      (nums[mid] === nums[mid + 1] && (n - mid) % 2 === 0) ||
      ((n - (mid - 1)) % 2 === 0 && nums[mid] === nums[mid - 1])
    ) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
    mid = Math.floor((left + right) / 2);
  }
  return nums[mid];
}
