export function longestNiceSubstring(s: string): string {
  let results = "";
  let maxDistance = 0;
  let left = 0;
  const map: Map<string, number> = new Map();
  for (let right = 0; right < s.length; right++) {
    let char = s[right];
    map.set(char, right);
    if (right === 0) {
      continue;
    }
    const pre = right - 1;
    const preChar = s[pre];
    // 如果把当前字符加进来的话，会导致前面的一个字符在窗口中不会出现大小写
    // TODO: 如果同时抹除了某些字符串
    if (!map.has(preChar.toLowerCase()) || !map.has(preChar.toUpperCase())) {
      map.clear();
      // 直接丢弃前面的
      left = right;
      map.set(char, right);
    } else {
      const set = new Set([...map.keys()].map((v) => v.toLowerCase()));
      if (set.size * 2 === map.size) {
        const D = right - left + 1;
        if (D > maxDistance) {
          results = s.substring(left, right + 1);
          maxDistance = D;
        }
      }
    }
  }
  return results;
}
