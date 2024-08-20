export function groupAnagrams(strs: string[]): string[][] {
  const sizeMap: Map<number, string[]> = new Map();
  for (let i = 0; i < strs.length; i++) {
    const s = strs[i];
    const l = s.length;
    const group = sizeMap.get(l) || [];
    if (!group.length) {
      sizeMap.set(l, group);
    }
    group.push(s);
  }
  const results: string[][] = [];
  sizeMap.forEach((group) => {
    const map: Map<string, string[]> = new Map();
    group.forEach((word) => {
      const sorted = word
        .split("")
        .sort((a, b) => {
          return a.charCodeAt(0) - b.charCodeAt(0);
        })
        .join("");
      const combineSet = map.get(sorted) || [];
      if (!combineSet.length) {
        map.set(sorted, combineSet);
      }
      combineSet.push(word);
    });
    results.push(...map.values());
  });
  return results;
}
