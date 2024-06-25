function calc(
  candidates: number[],
  target: number,
  offset: number
): number[][] {
  if (offset >= candidates.length || target <= 0) {
    return [];
  }
  // 如果能找的到的话
  if (candidates.slice(offset).find((v) => v === target)) {
    return [[target]];
  }
  const results: number[][] = [];
  let startNum = candidates[offset];
  let pos = offset + 1;
  // 向后找到一个不相同的数字
  while (pos < candidates.length && candidates[pos] === candidates[offset]) {
    pos++;
  }
  // 表示当前有这么多个相同的数字
  let size = pos - offset;
  for (let i = 0; i <= size; i++) {
    const sum = startNum * i;
    const subResults = calc(candidates, target - sum, pos);
    for (let k = 0; k < subResults.length; k++) {
      results.push([
        ...(Array.from({
          length: i,
        }).fill(startNum) as number[]),
        ...subResults[k],
      ]);
    }
  }
  return results;
}

export function combinationSum2(
  candidates: number[],
  target: number
): number[][] {
  // 先排序
  candidates.sort((a, b) => {
    return a - b;
  });
  return calc(candidates, target, 0);
}
