function str2Map(s: string) {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const cnt = map.get(char) || 0;
    if (cnt === 0) {
      map.set(char, 1);
    } else {
      map.set(char, cnt + 1);
    }
  }
  return map;
}

export function takeCharacters(s: string, k: number): number {
  const map = str2Map(s);
  const total = 3 * k;
  const cntA = map.get("a") || 0;
  const cntB = map.get("b") || 0;
  const cntC = map.get("c") || 0;
  // 总数太少，肯定无法满足，其中一个找不全，也不能满足
  if (s.length < total || cntA < k || cntB < k || cntC < k) {
    return -1;
  }
  let left = 0;
  let maxDistance = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    const cnt = map.get(char) || 0;
    // 说明这个元素是需要保留的，不能被干掉了
    if (cnt <= k) {
      let D = right - left;
      // 先更新距离
      maxDistance = Math.max(maxDistance, D);
      // 需要把这个期间丢弃的字符补起来，因为right这个位置是还没有进去的
      while (s[left] !== char) {
        let tmpChar = s[left];
        const t = map.get(tmpChar) || 0;
        if (t === 0) {
          map.set(tmpChar, 1);
        } else {
          map.set(tmpChar, t + 1);
        }
        left++;
      }
      // TODO: ？
      // left = right + 1;
    } else {
      map.set(char, cnt - 1);
    }
  }
  return s.length - maxDistance;
}
