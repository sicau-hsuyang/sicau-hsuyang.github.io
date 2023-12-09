function s(str1: string): number {
  const dict = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const obj = {};
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    if (obj[char]) {
      obj[char]++;
    } else {
      obj[char] = 1;
    }
  }
  let offset = 0;
  while (offset < dict.length) {
    const pos = dict[offset];
    if (obj[pos]) {
      return obj[pos];
    }
    offset++;
  }
  return 0;
}

export function numSmallerByFrequency(
  queries: string[],
  words: string[]
): number[] {
  const nums = words.map((a) => {
    return s(a);
  });
  nums.sort((a, b) => {
    return a - b;
  });
  const ret: number[] = [];
  for (let i = 0; i < queries.length; i++) {
    const query = s(queries[i]);
    const count = binarySearch(nums, query);
    ret.push(count);
  }
  return ret;
}

export function binarySearch(nums: number[], target: number) {
  let right = nums.length - 1;
  let left = 0;
  let mid = Math.floor((right + left) / 2);
  let count = -1;
  if (target > nums[right]) {
    return 0;
  } else if (target < nums[left]) {
    return nums.length;
  }
  while (left <= right) {
    if (target >= nums[mid]) {
      left = mid + 1;
      mid = Math.floor((right + left) / 2);
    } else {
      right = mid - 1;
      mid = Math.floor((right + left) / 2);
    }
  }
  count = nums.length - left;
  return count;
}
