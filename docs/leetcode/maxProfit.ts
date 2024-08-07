// function calculator(
//   prices: number[],
//   holdChip: number,
//   offset: number,
//   memo: number[][]
// ) {
//   if (offset >= prices.length) {
//     return 0;
//   }
//   if (memo[offset][holdChip] !== -1) {
//     return memo[offset][holdChip];
//   }
//   // 当前持有芯片
//   if (holdChip) {
//     // 卖出芯片，即不再持有芯片
//     const saleProfit = prices[offset];
//     const waitProfit = calculator(prices, 1, offset + 1, memo);
//     const profit = Math.max(saleProfit, waitProfit);
//     memo[offset][holdChip] = profit;
//     return profit;
//   } else {
//     const buyProfit = -prices[offset] + calculator(prices, 1, offset + 1, memo);
//     const waitProfit = calculator(prices, 0, offset + 1, memo);
//     const profit = Math.max(buyProfit, waitProfit);
//     memo[offset][holdChip] = profit;
//     return profit;
//   }
// }

// export function maxProfit(prices: number[]): number {
//   const memo: number[][] = Array.from({
//     length: prices.length,
//   }).map((v) => {
//     return [-1, -1];
//   }) as number[][];
//   const p = calculator(prices, 0, 0, memo);
//   return p;
// }

export function maxProfit(prices: number[]): number {
  const dp: number[][] = Array.from({
    length: prices.length,
  }).map(() => {
    return [0, 0];
  }) as number[][];
  // 第一天不持有
  dp[0][0] = 0;
  // 第一天持有
  dp[0][1] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    // 第i天持有，当天买或之前持有
    dp[i][1] = Math.max(dp[i - 1][1], -price);
    // 第i天不持有，当天不持有或者是之前持有
    dp[i][0] = Math.max(dp[i - 1][1] + price, dp[i - 1][0]);
  }
  return dp[prices.length - 1][0];
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
