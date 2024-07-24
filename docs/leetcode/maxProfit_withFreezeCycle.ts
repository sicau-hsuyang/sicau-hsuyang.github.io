// /**
//  * 获取状态
//  * @param saleStock 当日卖出股票
//  * @param holdStock 当日持有股票
//  * @returns
//  */
// function getStatus(saleStock: boolean, holdStock: boolean) {
//   let status!: number;
//   if (!saleStock && !holdStock) {
//     status = 0;
//   } else if (!saleStock && holdStock) {
//     status = 1;
//   } else if (saleStock && !holdStock) {
//     status = 2;
//   } else if (saleStock && holdStock) {
//     status = 3;
//   }
//   return status;
// }

// function transaction(
//   prices: number[],
//   saleStock: boolean,
//   holdStock: boolean,
//   offset: number,
//   memo: number[][]
// ) {
//   if (offset >= prices.length) {
//     return 0;
//   }
//   let status = getStatus(saleStock, holdStock);
//   if (memo[offset][status] !== -1) {
//     return memo[offset][status];
//   }
//   // 如果之前一天已经卖过股票了，现在就只能干等着
//   if (saleStock) {
//     return transaction(prices, false, false, offset + 1, memo);
//   }
//   // 如果当前持有股票
//   else if (holdStock) {
//     // 卖出股票的收益
//     const saleProfit =
//       prices[offset] + transaction(prices, true, false, offset + 1, memo);
//     // 继续持有的收益
//     const holdProfit = transaction(prices, false, true, offset + 1, memo);
//     const profit = Math.max(saleProfit, holdProfit);
//     memo[offset][status] = profit;
//     return profit;
//   } else {
//     // 买入股票的收益
//     const buyProfit =
//       -prices[offset] + transaction(prices, false, true, offset + 1, memo);
//     const waitProfit = transaction(prices, false, false, offset + 1, memo);
//     const profit = Math.max(buyProfit, waitProfit);
//     memo[offset][status] = profit;
//     return profit;
//   }
// }

// export function maxProfit(prices: number[]): number {
//   return transaction(
//     prices,
//     false,
//     false,
//     0,
//     Array.from({
//       length: prices.length,
//     }).map((v) => {
//       return Array.from({
//         length: 4,
//       }).fill(-1) as number[];
//     })
//   );
// }

export function maxProfit(prices: number[]): number {
  const dp: number[][] = Array.from({
    length: prices.length,
  }).map((v) => {
    return Array.from({
      length: 3,
    }).fill(-1) as number[];
  });
  //第一天什么都不做
  dp[0][0] = 0;
  // 第一天持有
  dp[0][1] = -prices[0];
  // 第一天卖出
  dp[0][2] = -1;
  for (let i = 1; i < prices.length; i++) {
    // 第i天
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    dp[i][2] = dp[i - 1][1] + prices[i];
  }
}
