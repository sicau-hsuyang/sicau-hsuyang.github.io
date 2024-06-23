// export function mincostTickets(
//   days: number[],
//   costs: number[],
//   dp: number[] = [],
//   startPos = 0
// ): number {
//   // 因为超过了长度，所以后续可以不用再计算了
//   if (days.length === startPos) {
//     return 0;
//   }
//   // 如果已经算过了
//   if (dp[startPos]) {
//     return dp[startPos];
//   }
//   let minCost = Number.MAX_VALUE;
//   let ticketDefine = [1, 7, 30];
//   for (let k = 0; k < costs.length; k++) {
//     const price = costs[k];
//     // 从当前天开始
//     let j = startPos;
//     let expire = ticketDefine[k];
//     // 这一天其实已经是票的有效日期的后一天了，因为买票是从当天开始算的
//     let endDay = days[startPos] + expire;
//     // 收罗在这个范围的日期，都可以通过这张票解决问题
//     while (j < days.length && days[j] < endDay) {
//       j++;
//     }
//     // 后续的时间，又需要重新花钱买票了
//     const cost = mincostTickets(days, costs, dp, j);
//     dp[j] = cost;
//     // 多次，选择一次最小的花费
//     minCost = Math.min(minCost, price + cost);
//   }
//   return minCost;
// }

export function mincostTickets(days: number[], costs: number[]): number {
  let n = days.length;
  const dp: number[] = Array.from({
    length: n + 1,
  });
  dp.fill(Infinity);
  // 最后一个肯定是0
  dp[n] = 0;
  let ticketDefine = [1, 7, 30];
  for (let i = days.length - 1; i >= 0; i--) {
    for (let k = 0; k < costs.length; k++) {
      const price = costs[k];
      // 从当前天开始
      let j = i;
      let expire = ticketDefine[k];
      // 这一天其实已经是票的有效日期的后一天了，因为买票是从当天开始算的
      let endDay = days[i] + expire;
      // 收罗在这个范围的日期，都可以通过这张票解决问题
      while (j < days.length && days[j] < endDay) {
        j++;
      }
      // 多次，选择一次最小的花费
      dp[i] = Math.min(dp[i], price + dp[j]);
    }
  }
  return dp[0];
}
