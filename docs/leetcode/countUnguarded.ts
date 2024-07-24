export function countUnguarded(
  m: number,
  n: number,
  guards: number[][],
  walls: number[][]
): number {
  let totalCell = m * n;
  // 被守卫了的格子
  let guardedCell = 0;
  let wallCount = walls.length;
  let guardsCount = guards.length;
  const map: Map<number, Map<number, boolean>> = new Map();
  for (let i = 0; i < guardsCount; i++) {
    // 守卫的位置
    const [row, col] = guards[i];
    let offsetBottom = row + 1;
    let offsetTop = row - 1;
    while (offsetBottom < m) {
      // 遇到墙或者警卫
    }
    while (offsetTop >= 0) {
      // 遇到墙或者警卫
    }
    let offsetRight = col + 1;
    let offsetLeft = col - 1;
    while (offsetRight < n) {
      // 遇到墙或者警卫
    }
    while (offsetLeft >= 0) {
      // 遇到墙或者警卫
    }
  }
  // 总数 - 被守卫的格子 - 墙的个数 - 守卫的个数
  return totalCell - guardedCell - wallCount - guardsCount;
}
