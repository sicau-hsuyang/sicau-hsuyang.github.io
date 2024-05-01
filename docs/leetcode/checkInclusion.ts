function isPermutation(
  dict1: Map<string, number>,
  dict2: Map<string, number>
): boolean {
  for (const [key, val] of dict1) {
    const count = dict2.get(key);
    if (count !== val) {
      return false;
    }
  }
  return true;
}

export function checkInclusion(s1: string, s2: string): boolean {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < s1.length; i++) {
    const char = s1[i];
    const counter = map.get(char) || 0;
    if (counter) {
      map.set(char, counter + 1);
    } else {
      map.set(char, 1);
    }
  }
  let D = s1.length;
  let left = 0;
  let windowMap: Map<string, number> = new Map();
  for (let right = 0; right < s2.length; right++) {
    const char = s2[right];
    // 如果哈希表里面没有记录的话，也就是说从left到这个位置的都不是合理的结果，直接从当前位置的下一个位置重新开始尝试寻找
    if (!map.has(char)) {
      left = right + 1;
      windowMap.clear();
      continue;
    }
    const count = windowMap.get(char) || 0;
    // 如果窗口内的元素没有记录的话
    if (count === 0) {
      windowMap.set(char, 1);
    } else {
      windowMap.set(char, count + 1);
    }
    const distance = right - left + 1;
    if (distance === D) {
      if (isPermutation(map, windowMap)) {
        console.log(s2.substring(left, right + 1));
        return true;
      }
      // 窗口中出来一个元素
      const leftChar = s2[left];
      const count = windowMap.get(leftChar)!;
      windowMap.set(leftChar, count - 1);
      left++;
    }
  }
  return false;
}
