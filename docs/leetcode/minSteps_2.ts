function str2Map(s: string) {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    const chat = s[i];
    const cnt = map.get(chat) || 0;
    if (cnt === 0) {
      map.set(chat, 1);
    } else {
      map.set(chat, cnt + 1);
    }
  }
  return map;
}

export function minSteps(s: string, t: string): number {
  const m1 = str2Map(s);
  const m2 = str2Map(t);
  let c1 = 0;
  let c2 = 0;
  // 共有的key
  const set: Set<string> = new Set();
  for (const [key1, value1] of m1.entries()) {
    for (const [key2, value2] of m2.entries()) {
      if (key1 === key2) {
        set.add(key1);
        if (value1 > value2) {
          c1 += value1 - value2;
        } else if (value1 < value2) {
          c2 += value2 - value1;
        }
      }
    }
  }
  // 找到第一个字符串中独有的
  for (const key1 of m1.keys()) {
    if (!m2.has(key1)) {
      const cnt = m1.get(key1) || 0;
      c1 += cnt;
    }
  }
  // 找到第二个字符串中独有的
  for (const key2 of m2.keys()) {
    if (!m1.has(key2)) {
      const cnt = m2.get(key2) || 0;
      c2 += cnt;
    }
  }

  return c1 + c2;
}
