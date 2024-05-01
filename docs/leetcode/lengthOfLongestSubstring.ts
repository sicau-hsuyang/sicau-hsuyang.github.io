export function lengthOfLongestSubstring(s: string): number {
  let maxDistance = -Infinity;
  // 每种字符上次出现的位置
  const dict: Record<string, number> = {};
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    // 取出当前字符
    const char = s[right];
    // 找到这个字符上一次出现的位置，没有出现过的话
    const preCharLeft = dict[char] ?? -1;
    // 更新这个字符出现的位置
    dict[char] = right;
    // 如果这个字符上次出现的字符不在当前窗口内的话，那就可以高枕无忧的继续向后推进，否则，窗口的状态进行变化，left向右递进N个位置
    if (preCharLeft >= left) {
      left = preCharLeft + 1;
    }
    let D = right - left + 1;
    if (D > maxDistance) {
      maxDistance = D;
    }
  }
  return maxDistance === -Infinity ? 0 : maxDistance;
}
