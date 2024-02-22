export function calculateMinimumHP(dungeon: number[][]): number {
  let height = dungeon.length;
  let width = dungeon[0].length;
  const dp: Array<
    Array<{
      health: number;
      life: number;
    }>
  > = Array.from({
    length: height,
  }).map(() => {
    return Array.from({
      length: width,
    }).map(() => {
      return {
        health: 0,
        life: 0,
      };
    });
  });
  dp[0][0] = {
    /**
     * 最低血量要求
     */
    health: dungeon[0][0] <= 0 ? Math.abs(dungeon[0][0]) + 1 : 1,
    /**
     * 当前的生命值
     */
    life: dungeon[0][0] > 0 ? dungeon[0][0] : 1,
  };
  /* 求Y轴 */
  for (let i = 1; i < dungeon.length; i++) {
    let { health, life } = dp[i - 1][0];
    // 当前地下城需要消耗的生命值
    const cellCost = dungeon[i][0];
    // 如果需要消耗生命值
    if (cellCost < 0) {
      // 当前消耗之后的生命值
      let currentHealth = life + cellCost;
      // 需要消耗当前负值还要保留1
      if (currentHealth <= 0) {
        health = Math.abs(currentHealth) + 1 + health;
        // 使他维持在最低的生命值
        life = 1;
      }
    } else {
      life = life + cellCost;
    }
    dp[i][0] = {
      health,
      life,
    };
  }
  /* 求X轴 */
  for (let i = 1; i < dungeon[0].length; i++) {
    let { health, life } = dp[0][i - 1];
    // 当前地下城需要消耗的生命值
    const cellCost = dungeon[0][i];
    // 如果需要消耗生命值
    if (cellCost < 0) {
      // 当前消耗之后的生命值
      let currentHealth = life + cellCost;
      // 需要消耗当前负值还要保留1
      if (currentHealth <= 0) {
        health = Math.abs(currentHealth) + 1 + health;
        life = 1;
      }
    } else {
      life = life + cellCost;
    }
    dp[0][i] = {
      health,
      life,
    };
  }
  for (let i = 1; i < dungeon.length; i++) {
    for (let j = 1; j < dungeon[i].length; j++) {
      // 左边的生命值
      let left = dp[i][j - 1];
      // 上边的生命值
      let top = dp[i - 1][j];
      let leftLife = left.life;
      let leftHealth = left.health;
      let topLife = top.life;
      let topHealth = top.health;
      // 当前需要消耗的生命值
      let cellCost = dungeon[i][j];
      let health, life;
      // 如果需要更新生命值的花费
      if (cellCost < 0) {
        // 如果左边和上边要求的生命值上限相等的话，没什么可说的，取当前能够保留的生命值较大的那个路径
        let currentRemainLeftLife = leftLife + cellCost;
        let currentRemainTopLife = topLife + cellCost;
        // 如果上边和下边的生命值上限不相等的话，取最终导致生命值上限要求较低的那个
        // 左边的生命值要求，如果当前的生命值小于0的话，需要给他补足到1，这又会导致生命值上限要求的增长
        let leftRequireHealth =
          currentRemainLeftLife <= 0
            ? Math.abs(currentRemainLeftLife) + 1 + leftHealth
            : leftHealth;
        let topRequireHealth =
          currentRemainTopLife <= 0
            ? Math.abs(currentRemainTopLife) + 1 + topHealth
            : topHealth;
        if (
          leftRequireHealth < topRequireHealth ||
          (leftHealth === topHealth && leftLife > topLife)
        ) {
          health = leftRequireHealth;
          life = currentRemainLeftLife < 0 ? 1 : currentRemainLeftLife;
        } else {
          health = topRequireHealth;
          life = currentRemainTopLife < 0 ? 1 : currentRemainTopLife;
        }
      } else {
        // 如果当前的格子不会影响取生命值，则取要求生命值上限更低的路径
        if (leftHealth < topHealth) {
          health = leftHealth;
          life = leftLife + cellCost;
        } else {
          health = topHealth;
          life = topLife + cellCost;
        }
      }
      console.log(health);
      dp[i][j] = {
        health,
        life,
      };
    }
  }
  const health = dp[height - 1][width - 1].health;
  return health;
}

/**
 
[
  [1,  -3,  3],
  [0,  -2,  0],
  [-3, -3, -3]
]
 */
