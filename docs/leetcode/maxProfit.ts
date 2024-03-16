export function maxProfit(prices: number[]): number {
  const dp: number[][] = Array.from({
    length: 2,
  }).map(() => {
    return Array.from({
      length: prices.length,
    }).fill(0);
  }) as number[][];
  // 第一天买入
  dp[0][0] = -prices[0];
  // 第一天肯定是无法进行卖出的
  dp[1][0] = 0;
  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    dp[0][i] = Math.max(dp[0][i - 1], -price);
    dp[1][i] = Math.max(dp[0][i - 1] + price, dp[1][i-1]);
  }
  return dp[1][prices.length - 1];
}

/**

dp[i][0] 表示第i天持有股票的最大现金
dp[i][1] 表示第i天不持有股票的最大现金


dp[i][0]:

前一天 dp[i-1][0] 持有股票
当前天持有股票，即买入： -prices[i]

状态转移方程式：dp[i][0] = max{ dp[i-1][0], -prices[i] }

dp[i][1]:

前一天不持有股票 dp[i-1][1]
当天不持有股票，即卖出  dp[i-1][0]+prices[i] 

状态转移方程式：dp[i][1] = max{ dp[i-1][0], prices[i] + dp[i-1][1]}
 */
