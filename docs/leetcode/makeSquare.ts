function trySpell(
  matchsticks: number[],
  offset: number,
  collection: number[][]
) {

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
  const collection = Array.from({
    length: 4,
  }).map((v) => {
    return [];
  });
  trySpell(matchsticks, 0, collection);
}
