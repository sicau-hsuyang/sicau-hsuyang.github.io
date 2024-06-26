// function testWeightBagProblem(
//   weight: number[],
//   value: number[],
//   limit: number
// ): number {
//   const len: number = weight.length;
//   // dp[i][j]，表示从0-i件物品任意选择，容量不超过j的最大价值
//   const dp: number[][] = Array.from({
//     length: len + 1,
//   }).map(() => {
//     return Array.from({
//       length: limit + 1,
//     }).fill(0) as number[];
//   });
//   // 不管多少背包重量都取第一个
//   for (let j = weight[0]; j <= limit; j++) {
//     dp[0][j] = value[0];
//   }
//   // 代表物品编号
//   for (let i = 1; i < len; i++) {
//     // 代表已选择的背包重量
//     for (let j = 0; j <= limit; j++) {
//       // 不选 i号 物品
//       dp[i][j] = dp[i - 1][j];
//       // 如果背包还有空间
//       if (j - weight[i] >= 0) {
//         // 不选 或者 选 里面选一个最大的
//         dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - weight[i]] + value[i]);
//       }
//     }
//   }
//   return dp[len - 1][limit];
// }

//#region 卡尔

function testWeightBagProblem(
  weight: number[],
  value: number[],
  limit: number
): number {
  // dp[i][j], 0-i件物品，取or不取，背包容量为j的最大收益
  const dp: number[][] = Array.from({
    length: weight.length,
  }).map((v) => {
    return Array.from({
      length: limit + 1,
    }).fill(0) as number[];
  });
  // 取第0件物品，起始重量肯定是第一件物品的重量
  for (let j = weight[0]; j <= limit; j++) {
    dp[0][j] = value[0];
  }
  for (let i = 1; i < weight.length; i++) {
    for (let j = 0; j <= limit; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j - weight[i] >= 0) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }
  return dp[weight.length - 1][limit];
}

export function main() {
  const weight = [1, 3, 4];
  const value = [15, 20, 30];
  const totalWeight = 4;
  console.log(testWeightBagProblem(weight, value, totalWeight));
}

//#endregion 卡尔

//#region 左程云

function testWeightBagProblem1(
  weight: number[],
  value: number[],
  limit: number
): number {
  // dp[i][j], 0-i件物品，取or不取，背包容量为j的最大收益
  const dp: number[][] = Array.from({
    length: weight.length,
  }).map((v) => {
    return Array.from({
      length: limit + 1,
    }).fill(0) as number[];
  });
  // 取第0件物品
  // for (let j = weight[0]; j <= limit; j++) {
  //   dp[0][j] = value[0];
  // }
  for (let i = 1; i < weight.length; i++) {
    for (let j = 0; j <= limit; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j - weight[i] >= 0) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }
  // 因为有一个是没用的，即第一行的元素，
  return dp[weight.length - 1][limit];
}

export function main1() {
  const weight = [0, 1, 3, 4];
  const value = [0, 15, 20, 30];
  const totalWeight = 4;
  console.log(testWeightBagProblem1(weight, value, totalWeight));
}

//#endregion
