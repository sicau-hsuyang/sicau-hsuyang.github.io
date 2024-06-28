/**
你将得到一个整数数组 matchsticks ，其中 matchsticks[i] 是第 i 个火柴棒的长度。你要用 所有的火柴棍 拼成一个正方形。你 不能折断 任何一根火柴棒，但你可以把它们连在一起，而且每根火柴棒必须 使用一次 。

如果你能使这个正方形，则返回 true ，否则返回 false 。
 */

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
  const dp: number[] = Array.from({
    length: matchsticks.length,
  });
  for (let i = 0; i < matchsticks.length; i++) {
    
  }
}
