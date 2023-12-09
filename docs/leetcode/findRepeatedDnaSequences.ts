export function findRepeatedDnaSequences(s: string): string[] {
  const res: string[] = [];
  const map: Map<string, number> = new Map();
  let left = 0;
  let right = left + 10;
  while (right <= s.length) {
    const str = s.substring(left, right);
    const record = map.get(str) || 0;
    if (record === 0) {
      map.set(str, 1);
    } else {
      // 发现重复
      if (record === 1) {
        map.set(str, 2);
        res.push(str);
      }
    }
    left++;
    right++;
  }
  return res;
}
