// TODO:
export function findSubsequences(numList: number[]): number[][] {
  const results: number[][] = [];
  const map: Map<number, Set<number>> = new Map();
  for (let i = 0; i < numList.length; i++) {
    let cur = numList[i];
    const set: Set<number> = new Set();
    map.set(cur, set);
    for (let k = i + 1; k < numList.length; k++) {
      let tmp = [numList[i]];
      let now = cur;
      let offset = k;
      let next = numList[offset];
      if (map.get(cur)!.has(next)) {
        continue;
      }
      while (offset < numList.length) {
        if (next >= now) {
          tmp.push(next);
          // copy一份
          results.push(tmp.slice(0));
          map.get(cur)!.add(next);
          now = next;
        }
        offset++;
        next = numList[offset];
      }
    }
  }
  return results;
}
