export function findContentChildren(g: number[], s: number[]): number {
  g.sort((a, b) => {
    return a - b;
  });
  s.sort((a, b) => {
    return a - b;
  });
  let gStart = 0;
  let sStart = 0;
  let curS = s[sStart];
  let result = 0;
  // 如果没有饼干了，就没有继续下去的理由了
  while (gStart < g.length && curS) {
    let curG = g[gStart];
    // 胃口刚好满足
    if (curG <= curS) {
      gStart++;
      sStart++;
      result++;
    } else if (curG > curS) {
      // 最小的孩子的胃口找不到合适的饼干满足，尝试向后面找更大的饼干
      sStart++;
    }
    curS = s[sStart];
  }
  return result;
}
