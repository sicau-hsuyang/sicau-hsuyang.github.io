function trySplit(s: string, set: Set<string>) {
  if (s === "") {
    return 0;
  }
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    const currentStr = s.substring(0, i + 1);
    if (set.has(currentStr)) {
      continue;
    }
    set.add(currentStr);
    const remainStr = s.substring(i + 1);
    const tempMax = 1 + trySplit(remainStr, set);
    max = Math.max(max, tempMax);
    set.delete(currentStr);
  }
  return max;
}

export function maxUniqueSplit(s: string): number {
  return trySplit(s, new Set());
}
