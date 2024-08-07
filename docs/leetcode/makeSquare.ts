function trySpell(
  sum: number,
  matchsticks: number[],
  offset: number,
  collection: number[]
) {
  if (offset >= matchsticks.length) {
    const set = new Set(collection);
    return set.size === 1 && set.has(sum);
  }
  for (let i = 0; i < 4; i++) {
    // 剪枝
    if (collection[i] + matchsticks[offset] <= sum) {
      collection[i] += matchsticks[offset];
      const flag = trySpell(sum, matchsticks, offset + 1, collection);
      if (flag) {
        return true;
      }
      collection[i] -= matchsticks[offset];
    }
  }
  return false;
}

export function makeSquare(matchsticks: number[]): boolean {
  // 先总和
  const sum = matchsticks.reduce((total, cur) => {
    return total + cur;
  }, 0);
  // 如果能拆分的成4个的话，那才有尝试的必要
  if (sum % 4 !== 0) {
    return false;
  }
  // 选出的目标
  const target = sum / 4;
  // 必须是整数
  if (Math.floor(target) !== target) {
    return false;
  }

  if (matchsticks.some((v) => v > target)) {
    return false;
  }

  matchsticks.sort((a, b) => {
    return b - a;
  });

  const collection = Array.from({
    length: 4,
  }).fill(0) as number[];

  return trySpell(target, matchsticks, 0, collection);
}
