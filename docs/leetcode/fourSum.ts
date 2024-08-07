/**

[-2, -1, 0, 0, 1, 2]

[-2, -1, 1, 2]
[-2, 0, 0, 2]

[]

 */

export function fourSum(nums: number[], target: number): number[][] {
  const results: number[][] = [];
  // 如果元素的长度不足4个，肯定是没有任何可能凑成解的
  if (nums.length < 4) {
    return results;
  }
  // 先排序
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 3; ) {
    for (let j = i + 1; j < nums.length - 2; ) {
      let start = j + 1;
      let end = nums.length - 1;
      let sum = nums[i] + nums[j] + nums[start] + nums[end];
      while (start < end) {
        if (sum === target) {
          results.push([nums[i], nums[j], nums[start], nums[end]]);
          // 从左边剔除重复的
          let offset1 = start + 1;
          while (nums[offset1] === nums[start] && offset1 < end) {
            offset1++;
          }
          start = offset1;
          // 从右边剔除重复的
          let offset2 = end - 1;
          while (nums[offset2] === nums[end] && offset2 > start) {
            offset2--;
          }
          end = offset2;
        } else if (sum < target) {
          let offset1 = start + 1;
          while (nums[offset1] === nums[start]) {
            offset1++;
          }
          start = offset1;
        } else if (sum > target) {
          let offset2 = end - 1;
          while (nums[offset2] === nums[end] && offset2 > start) {
            offset2--;
          }
          end = offset2;
        }
        sum = nums[i] + nums[j] + nums[start] + nums[end];
      }
      // 跨过重复的j
      let offset = j + 1;
      while (nums[offset] === nums[j]) {
        offset++;
      }
      j = offset;
    }
    // 跳过重复的值i
    let offset = i + 1;
    while (nums[offset] === nums[i]) {
      offset++;
    }
    i = offset;
  }
  return results;
}
