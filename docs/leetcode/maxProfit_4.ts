// function getProfit(
//   prices: number[],
//   holdStock: number,
//   k: number,
//   offset: number,
//   memo: number[][][]
// ) {
//   // 超出了交易次数
//   if (k < 0 || offset >= prices.length) {
//     return 0;
//   }
//   if (memo[offset]?.[holdStock]?.[k] !== -1) {
//     return memo[offset][holdStock][k];
//   }
//   let profit: number;
//   // 持有股票
//   if (holdStock) {
//     // 卖出股票的收益
//     const saleProfit =
//       prices[offset] + getProfit(prices, 0, k, offset + 1, memo);
//     // 继续持有股票的收益
//     const waitProfit = getProfit(prices, 1, k, offset + 1, memo);
//     profit = Math.max(saleProfit, waitProfit);
//   } else {
//     // 买入股票的收益
//     const buyProfit =
//       -prices[offset] + getProfit(prices, 1, k - 1, offset + 1, memo);
//     // 等待时机的收益
//     const waitProfit = getProfit(prices, 0, k, offset + 1, memo);
//     profit = Math.max(buyProfit, waitProfit);
//   }
//   memo[offset][holdStock][k] = profit;
//   return profit;
// }

// export function maxProfit(k: number, prices: number[]): number {
//   const memo: number[][][] = Array.from({
//     length: prices.length,
//   }).map((v) => {
//     return Array.from({
//       length: 2,
//     }).map((v) => {
//       return Array.from({
//         length: k + 1,
//       }).fill(-1);
//     });
//   }) as number[][][];
//   return getProfit(prices, 0, k, 0, memo);
// }

export function maxProfit(k: number, prices: number[]): number {
  const n = prices.length;
  if (n == 0) {
    return 0;
  }

  // 创建 dp 数组
  const dp: number[][][] = Array.from({ length: n }, () =>
    Array.from({ length: 2 }, () => Array(k + 1).fill(0))
  );

  // 初始化
  for (let t = 0; t <= k; t++) {
    // 第一天不持有股票的利润为 0
    dp[0][0][t] = 0;
    // 第一天持有股票的利润为 -prices[0]
    dp[0][1][t] = -prices[0];
  }

  for (let i = 1; i < n; i++) {
    for (let t = 0; t <= k; t++) {
      // 第i天不持有股票， 之前持有股票今天卖出 或者之前也不持有股票，如果超过了最大的交易次数的话，今天肯定是没收益了
      dp[i][0][t] = Math.max(
        dp[i - 1][0][t],
        t > 0 ? dp[i - 1][1][t] + prices[i] : 0
      );
      // 第i天持有股票，之前持有股票，或者之前不持有股票且今天买入股票；如果只是最后一次了，那么肯定就只能再买一次了
      dp[i][1][t] = Math.max(
        dp[i - 1][1][t],
        t > 0 ? dp[i - 1][0][t - 1] - prices[i] : -prices[i]
      );
    }
  }

  // 最后一天不持有股票的最大利润
  let maxProfit = 0;
  for (let t = 0; t <= k; t++) {
    maxProfit = Math.max(maxProfit, dp[n - 1][0][t]);
  }
  return maxProfit;
}
