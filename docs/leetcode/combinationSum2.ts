function calc(
  candidates: number[][],
  target: number,
  offset: number
): number[][] {
  if (!candidates[offset]) {
    return [];
  }
  const res: number[][] = [];
  const group = candidates[offset];
  for (let S = 1; S <= group.length; S++) {
    if (target === S * group[0]) {
      const arr: number[] = [];
      for (let k = 0; k < S; k++) {
        arr.push(group[0]);
      }
      res.push(arr);
    } else if (target > S * group[0]) {
      const sub1 = calc(candidates, target - S * group[0], offset + 1);
      sub1.forEach((arr) => {
        for (let k = 0; k < S; k++) {
          arr.unshift(group[0]);
        }
        res.push(arr);
      });
    }
  }
  const sub2 = calc(candidates, target, offset + 1);
  sub2.forEach((arr) => {
    res.push(arr);
  });
  return res;
}

function groupBy(arr: number[]) {
  const map: Map<number, number[]> = new Map();
  for (let i = 0; i < arr.length; i++) {
    const g = map.get(arr[i]) || [];
    if (!g.length) {
      map.set(arr[i], g);
    }
    g.push(arr[i]);
  }
  return [...map.values()];
}

export function combinationSum2(
  candidates: number[],
  target: number
): number[][] {
  const g = groupBy(candidates);
  const res = calc(g, target, 0);
  return res;
}
