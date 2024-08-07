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

// export function bestTiming(prices: number[]): number {
//   const memo: number[][] = Array.from({
//     length: prices.length,
//   }).map((v) => {
//     return [-1, -1];
//   }) as number[][];
//   const p = calculator(prices, 0, 0, memo);
//   return p;
// }

export function bestTiming(prices: number[]) {
  const dp: number[][] = Array.from({
    length: prices.length,
  }).map((v) => {
    return [0, 0];
  }) as number[][];
  // 表示第0天不持有芯片
  dp[0][0] = 0;
  // 表示第0天持有芯片
  dp[0][1] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    // 第i天不持有芯片
    dp[i][0] = Math.max(prices[i] + dp[i - 1][1], dp[i - 1][0]);
    // 第i天持有芯片，只能是当天买
    dp[i][1] = Math.max(-prices[i], dp[i - 1][1]);
  }
  return dp[prices.length - 1][0];
}

// export function bestTiming(prices: number[]): number {
//   let maxProfit = 0;
//   // let buyPrice = -1;
//   // let salePrice = -1;
//   let minPrice = Infinity;
//   for (let i = 0; i < prices.length; i++) {
//     minPrice = Math.min(minPrice, prices[i]);
//     maxProfit = Math.max(maxProfit, prices[i] - minPrice);
//   }
//   return maxProfit;
// }
