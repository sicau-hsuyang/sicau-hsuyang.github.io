export function longestSubstring(s: string, k: number): number {
  let maxDistance = 0;
  let left = 0;
  let tempMap: Map<string, number> = new Map();
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    const count = tempMap.get(char) || 0;
    // 说明这个字符是用不得，有毒，要从后面的字符里面找
    if (count < k) {
      left = right + 1;
      tempMap.clear();
    }
    let distance = right - left + 1;
    if (maxDistance < distance) {
      console.log(s.substring(left, right + 1));
      maxDistance = distance;
    }
  }
  return maxDistance;
}
