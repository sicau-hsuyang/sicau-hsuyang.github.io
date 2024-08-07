function tryWeight(stones: number[], used: Set<number>) {
  // 没有剩下石头
  if (stones.length - used.size === 0) {
    return 0;
  }
  // 只剩最后一块石头了
  if (stones.length - used.size === 1) {
    return stones[0];
  }
  let bestMin = Number.MAX_VALUE;
  for (let i = 0; i < stones.length; i++) {
    if (used.has(i)) {
      continue;
    }
    for (let j = i + 1; j < stones.length; j++) {
      const min = tryWeight(stones, used);
      if (min < bestMin) {
        return min;
      }
    }
  }
}

export function lastStoneWeightII(stones: number[]): number {}
