// function deal(
//   prices: number[],
//   fee: number,
//   holdStock: number,
//   offset: number,
//   memo: number[][]
// ) {
//   if (offset >= prices.length) {
//     return 0;
//   }
//   if (memo[offset][holdStock] !== -1) {
//     return memo[offset][holdStock];
//   }
//   let buyProfit = -1;
//   let waitProfit = -1;
//   let saleProfit = -1;
//   // 当前没有持有股票
//   if (!holdStock) {
//     // 买入股票的收益
//     buyProfit = -prices[offset] + deal(prices, fee, 1, offset + 1, memo);
//     waitProfit = deal(prices, fee, 0, offset + 1, memo);
//   } else {
//     // 卖出股票的收益
//     saleProfit = prices[offset] - fee + deal(prices, fee, 0, offset + 1, memo);
//     // 保持现状的收益
//     waitProfit = deal(prices, fee, 1, offset + 1, memo);
//   }
//   let profit = Math.max(buyProfit, waitProfit, saleProfit);
//   memo[offset][holdStock] = profit;
//   return profit;
// }

// export function maxProfit(prices: number[], fee: number): number {
//   const record: number[][] = Array.from({
//     length: prices.length,
//   }).map(() => {
//     return [-1, -1];
//   }) as number[][];
//   return Math.max(
//     deal(prices, fee, 0, 0, record),
//     -prices[0] + deal(prices, fee, 1, 1, record)
//   );
// }

export function maxProfit(prices: number[], fee: number): number {
  const dp: number[][] = Array.from({
    length: prices.length,
  }).map(() => {
    return [-1, -1];
  }) as number[][];
  // 第一天不持有股票的利润
  dp[0][0] = 0;
  // 第一天持有股票的利润
  dp[0][1] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    // 卖出股票或保持不变
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
    // 买入股票或保持不变
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  // 最后一天不持有股票的收益
  return dp[prices.length - 1][0];
}
