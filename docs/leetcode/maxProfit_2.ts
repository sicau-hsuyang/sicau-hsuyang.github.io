// function deal(
//   prices: number[],
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
//   // 如果当前持有股票
//   if (holdStock) {
//     const saleProfit = prices[offset] + deal(prices, 0, offset + 1, memo);
//     const keepProfit = deal(prices, 1, offset + 1, memo);
//     const profit = Math.max(saleProfit, keepProfit);
//     memo[offset][holdStock] = profit;
//     return profit;
//   } else {
//     const buyProfit = -prices[offset] + deal(prices, 1, offset + 1, memo);
//     const keepProfit = deal(prices, 0, offset + 1, memo);
//     const profit = Math.max(buyProfit, keepProfit);
//     memo[offset][holdStock] = profit;
//     return profit;
//   }
// }

// export function maxProfit(prices: number[]): number {
//   const memo = Array.from({
//     length: prices.length,
//   }).map((v) => {
//     return [-1, -1];
//   });
//   return Math.max(
//     deal(prices, 0, 0, memo),
//     -prices[0] + deal(prices, 1, 1, memo)
//   );
// }

export function maxProfit(prices: number[]): number {
  const dp = Array.from({
    length: prices.length,
  }).map((v) => {
    return [-1, -1];
  }) as number[][];
  // 第一天不持有
  dp[0][0] = 0;
  // 第一天持有的收益
  dp[0][1] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    // 第i天不持有的收益，即前一天也不持有或者前一天持有但是今天卖出
    dp[i][0] = Math.max(prices[i] + dp[i - 1][1], dp[i - 1][0]);
    // 第i天持有的收益，因为可以多次买卖，即当天买+之前空仓的收益和之前也是持有的状态比较
    dp[i][1] = Math.max(-prices[i] + dp[i - 1][0], dp[i - 1][1]);
  }
  return dp[prices.length - 1][0];
}
