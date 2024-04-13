export function numSubarrayBoundedMax(
  nums: number[],
  left: number,
  right: number
): number {
  let total = 0;
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    const cur = nums[i];
    // 不在范围内
    if (cur > right) {
      continue;
    }
    let offset = i + 1;
    // 一直找比right还小的数，才有可能构成解，所以把比较大的数剔除掉
    while (offset < len && nums[offset] <= right) {
      offset++;
    }
    // 找到了合适的长度片段
    for (let k = i; k < offset; k++) {
      // 以第一个数作为最大的可能作为尝试
      let max = nums[k];
      // 表示假设最大以D为长度，d从1增加到D的所有子数组中，所有总的可能性方案数
      let size = offset - k;
      // 从k开始，d从1增加到distance，如果运气好的话，前面的数组元素出现的大，那么后面不管元素再小都可以了，即可以提前结束循环
      // 运气差的前提下，如果前面的数比较小，因此，这些方案将会被扣除，
      // 比如[1,2,3,4,5],D为5，这些子数组中要求最大的数最小值是5，[1], [1,2], [1,2,3], [1,2,3,4]都无法构成解集，只有[1,2,3,4,5]可以
      // 反之，如果是[5, 4, 3, 2, 1], 则是[5], [5,4], [5, 4 ,3], [5, 4, 3, 2], [5, 4, 3, 2, 1]都可以
      for (let d = 0; k + d < offset; d++) {
        const num = nums[k + d];
        if (max < num) {
          max = num;
        }
        // 如果已经遇到了在合理范围中的最大值，则可以提前终止循环，因为后面的方案都是可行的
        if (max >= left && max <= right) {
          break;
        } else {
          // 运气差，暂时还没有遇到在合理的范围中的最大值
          size--;
        }
      }
      // 有可能的方案，追加方案数
      if (max >= left && max <= right) {
        total += size;
      }
    }
    // 将指针移到下一个位置
    i = offset;
  }
  return total;
}
