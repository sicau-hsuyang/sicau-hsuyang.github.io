function validateExist(s: string, map: Map<string, number[]>) {
  // 当前向前走的偏移量
  let maxOffset = -1;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // 字符所在的位置，可能存在多个，找到一个大于maxOffset的最小的位置即可
    const posRecord = map.get(char) || [];
    // 找到这个最小的位置，这个位置可以来一个二分查找
    const charOffsetIdx = findMinGreaterThan(posRecord, maxOffset);
    // 找不到，则认为后面都没有合适的位置了，或者后面已经没有这样的字符了
    if (charOffsetIdx === null) {
      return false;
    }
    maxOffset = charOffsetIdx;
  }
  return true;
}

function findMinGreaterThan(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = null;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > target) {
      result = nums[mid];
      right = mid - 1; // 移动左边界以寻找更小的、大于目标的元素
    } else {
      left = mid + 1; // 移动右边界，因为nums[mid]不大于目标
    }
  }
  return result;
}

export function numMatchingSubseq(s: string, words: string[]): number {
  const map: Map<string, number[]> = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const dict = map.get(char) || [];
    if (dict.length === 0) {
      map.set(char, dict);
    }
    dict.push(i);
  }
  const distResults = words.filter((word) => {
    return validateExist(word, map);
  });
  return distResults.length;
}
