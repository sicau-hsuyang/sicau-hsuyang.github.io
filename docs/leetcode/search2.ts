export function search(nums: number[], target: number): boolean {
  let left = 0;
  let right = nums.length - 1;
  let mid = Math.floor((right + left) / 2);
  let found = false;
  while (left <= right) {
    console.log(nums.slice(left, right + 1));
    if (nums[mid] === target) {
      found = true;
      break;
    }
    // 在有序片段里
    else if (
      // 左侧片段有序，并且在左侧片段内
      (target >= nums[left] &&
        target <= nums[mid] &&
        nums[left] <= nums[mid]) ||
      // 左侧片段无序，并且在左侧片段内
      (target <= nums[mid] && target <= nums[left] && nums[mid] <= nums[left])
    ) {
      right = mid;
    } else {
      left = mid;
    }
    mid = Math.floor((right + left) / 2);
  }
  return found;
}
