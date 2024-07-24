function getProfit(
  prices: number[],
  holdStock: number,
  k: number,
  offset: number,
  memo: number[][][]
) {
  // 超出了交易次数
  if (k < 0 || offset >= prices.length) {
    return 0;
  }
  if (memo[offset]?.[holdStock]?.[k] !== -1) {
    return memo[offset][holdStock][k];
  }
  let profit: number;
  // 持有股票
  if (holdStock) {
    // 卖出股票的收益
    const saleProfit =
      prices[offset] + getProfit(prices, 0, k, offset + 1, memo);
    // 继续持有股票的收益
    const waitProfit = getProfit(prices, 1, k, offset + 1, memo);
    profit = Math.max(saleProfit, waitProfit);
  } else {
    // 买入股票的收益
    const buyProfit =
      -prices[offset] + getProfit(prices, 1, k - 1, offset + 1, memo);
    // 等待时机的收益
    const waitProfit = getProfit(prices, 0, k, offset + 1, memo);
    profit = Math.max(buyProfit, waitProfit);
  }
  memo[offset][holdStock][k] = profit;
  return profit;
}

export function maxProfit(prices: number[]): number {
  const memo: number[][][] = Array.from({
    length: prices.length,
  }).map((v) => {
    return Array.from({
      length: 2,
    }).map((v) => {
      return [-1, -1, -1];
    });
  }) as number[][][];
  return getProfit(prices, 0, 2, 0, memo);
}
