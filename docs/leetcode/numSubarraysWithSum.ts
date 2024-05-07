export function numSubarraysWithSum(nums: number[], goal: number): number {
  let total = 0;
  let left = 0;
  let sum = 0;
  let len = nums.length;

  for (let right = 0; right < len; right++) {
    const num = nums[right];
    sum += num;
    while (sum >= goal && left <= right) {
      if (sum === goal) {
        let offset = right + 1;
        // console.log(nums.slice(left, right + 1));
        total++;
        // TODO: 这儿是否考虑可以优化
        while (offset < len && nums[offset] === 0) {
          // console.log(nums.slice(left, offset + 1));
          offset++;
          total++;
        }
      }
      sum -= nums[left++];
    }
  }
  return total;
}
