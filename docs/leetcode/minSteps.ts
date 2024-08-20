function makeDict(s: string) {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    const cnt = map.get(s[i]) || 0;
    if (cnt === 0) {
      map.set(s[i], 1);
    } else {
      map.set(s[i], cnt + 1);
    }
  }
  return map;
}

export function minSteps(s: string, t: string): number {
  const dict1 = makeDict(s);
  const dict2 = makeDict(t);
  let count = 0;
  dict1.forEach((val, key) => {
    const cnt = dict2.get(key) || 0;
    const diff = Math.max(val - cnt, 0);
    count += diff;
  });
  return count;
}
