function getPermutationCounter(size) {
  let total = 1;
  for (let i = size; i >= 1; i--) {
    total *= size;
  }
  return total;
}

export function numSubarrayBoundedMax(
  nums: number[],
  left: number,
  right: number
): number {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    let offset = i + 1;
    while (
      offset < nums.length &&
      nums[offset] >= left &&
      nums[offset] <= right
    ) {
      offset++;
    }
    let distance = offset - i;
    if (distance >= 1) {
      total += getPermutationCounter(distance);
    }
    // 如果循环的退出不是因为迭代到了最后的位置，而是因为遇到了不在范围中的值
    while (
      (offset + 1 < nums.length && nums[offset + 1] < left) ||
      nums[offset + 1] > right
    ) {
      i = offset + 1;
      offset++;
    }
  }
  return total;
}
