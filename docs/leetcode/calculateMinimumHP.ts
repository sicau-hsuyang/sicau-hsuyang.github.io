export function calculateMinimumHP(dungeon: number[][]): number {
  let minHp = -Infinity;

  function move(dungeon: number[][], x: number, y: number) {
    // 越界
    if (y >= dungeon.length || x >= dungeon[y].length) {
      return -Infinity;
    }
    // 到了最下面的格子
    if (y === dungeon.length - 1 && x === dungeon[y].length - 1) {
      return dungeon[y][x];
    }
    const hp = dungeon[y][x];
    // 向下
    const bottomHp = move(dungeon, x, y + 1);
    // 向右
    const rightHp = move(dungeon, x + 1, y);
    const currentHp = hp + Math.max(bottomHp, rightHp);
    if (currentHp < 0 && currentHp > minHp) {
      minHp = currentHp;
    }
    return currentHp;
  }

  const hp = move(dungeon, 0, 0);
  console.log(hp, minHp);
  return hp < 0 ? Math.abs(hp) + 1 : 1;
}
