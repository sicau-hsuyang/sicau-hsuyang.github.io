function isAnagrams(
  dict1: Map<string, number>,
  dict2: Map<string, number>
): boolean {
  if (dict1.size !== dict2.size) {
    return false;
  }
  for (const [key, val] of dict1) {
    const count = dict2.get(key);
    if (count !== val) {
      return false;
    }
  }
  return true;
}

export function findAnagrams(s: string, p: string): number[] {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < p.length; i++) {
    const count = map.get(p[i]) || 0;
    if (count === 0) {
      map.set(p[i], 1);
    } else {
      map.set(p[i], count + 1);
    }
  }
  // 窗口记录的值
  const windowMap: Map<string, number> = new Map();
  const results: number[] = [];
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    // 如果当前进来的字符不在目标集合里面的话，说明这个过程都可以跳过
    if (!map.has(char)) {
      // 清空老窗口
      windowMap.clear();
      // 调整新窗口
      left = right + 1;
      continue;
    }
    const count = windowMap.get(char) || 0;
    // 如果窗口内的元素没有记录的话
    if (count === 0) {
      windowMap.set(char, 1);
    } else {
      windowMap.set(char, count + 1);
    }
    const D = right - left + 1;
    if (D === p.length) {
      // 满足条件，则追加结果
      if (isAnagrams(map, windowMap)) {
        results.push(left);
      }
      // 从窗口里面出来一个字符
      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar)! - 1);
      left++;
    }
  }
  return results;
}
