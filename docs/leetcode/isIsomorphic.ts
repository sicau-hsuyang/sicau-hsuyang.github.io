export function isIsomorphic(s: string, t: string): boolean {
  const leftMap: Map<string, string> = new Map();
  const rightMap: Map<string, string> = new Map();
  for (let i = 0; i < s.length; i++) {
    const lChar = s[i];
    const rChar = t[i];
    if (leftMap.has(lChar) || rightMap.has(rChar)) {
      const rR = leftMap.get(lChar);
      const lR = rightMap.get(rChar);
      if (lR !== lChar || rR !== rChar) {
        return false;
      }
    } else {
      leftMap.set(lChar, rChar);
      rightMap.set(rChar, lChar);
    }
  }
  return true;
}
