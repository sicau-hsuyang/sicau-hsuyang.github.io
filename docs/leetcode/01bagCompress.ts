function testWeightBagProblem(
  weight: number[],
  value: number[],
  limit: number
): number {
  // 状态压缩
  // dp[i][j], 0-i件物品，取or不取，背包容量为j的最大收益
  const dp: number[] = Array.from({
    length: limit + 1,
  }).fill(0) as number[];
  // 取第0件物品，起始重量肯定是第一件物品的重量
  for (let j = weight[0]; j <= limit; j++) {
    dp[j] = value[0];
  }
  for (let i = 1; i < weight.length; i++) {
    // for (let j = limit; j >= 0; j--) {
    //   if (j - weight[i] >= 0) {
    //     // 右边的dp[j]代表更新之前的前0-i个物品，不取i物品，重量为j的最大收益
    //     // dp[j-weight[i]]，代表取当前物品，重量为j的最大收益，因为我们是从右边更新到左边，所以，此刻的dp[j - weight[i]]代表的还是上一行的最大值
    //     // 左边的dp[j]代表更新之后的前0-i个物品取or不取，重量为j，最大收益为dp[j]
    //     dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    //   }
    // }

    for (let j = 0; j <= limit; j++) {
      if (j - weight[i] >= 0) {
        // 右边的dp[j]代表更新之前的前0-i个物品，不取i物品，重量为j的最大收益
        // dp[j-weight[i]]，代表取当前物品，重量为j的最大收益，因为我们是从右边更新到左边，所以，此刻的dp[j - weight[i]]代表的还是上一行的最大值
        // 左边的dp[j]代表更新之后的前0-i个物品取or不取，重量为j，最大收益为dp[j]
        dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
      }
    }
  }
  return dp[limit];
}

export function main() {
  const weight = [1, 3, 4];
  const value = [15, 20, 30];
  const totalWeight = 4;
  console.log(testWeightBagProblem(weight, value, totalWeight));
}
