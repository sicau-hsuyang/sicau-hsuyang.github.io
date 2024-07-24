// export function coinChange(coins: number[], amount: number): number {
//   const dp: number[] = Array.from({
//     length: amount + 1,
//   }).fill(amount + 1) as number[];
//   dp[0] = 0;
//   let min = Math.min(...coins);
//   for (let i = min; i <= amount; i++) {
//     for (let j = 0; j < coins.length; j++) {
//       if (coins[j] <= i) {
//         const select = dp[i - coins[j]] + 1;
//         if (select < dp[i]) {
//           dp[i] = select;
//         }
//       }
//     }
//   }
//   return dp[amount] > amount ? -1 : dp[amount];
// }

// /**

// dp[i] = dp[k] + d[i-k]

//  */

// function _change(coins: number[], amount: number, map: Map<number, number>) {
//   if (map.has(amount)) {
//     return map.get(amount)!;
//   }
//   if (amount === 0) {
//     return 0;
//   }
//   let minCount = Infinity;
//   for (let i = 0; i < coins.length && coins[i] <= amount; i++) {
//     let money = amount - coins[i];
//     const currentCount = 1 + _change(coins, money, map);
//     if (minCount > currentCount) {
//       minCount = currentCount;
//     }
//   }
//   map.set(amount, minCount);
//   return minCount;
// }

// export function coinChange(coins: number[], amount: number): number {
//   coins.sort((a, b) => a - b);
//   const total = _change(coins, amount, new Map());
//   return total === Infinity ? -1 : total;
// }

function _change(coins: number[], amount: number) {
  const dp: number[] = Array.from({
    length: amount + 1,
  }).fill(Infinity) as number[];
  dp[0] = 0;
  for (let money = coins[0]; money <= amount; money++) {
    let minCount = Infinity;
    for (let i = 0; i < coins.length && coins[i] <= money; i++) {
      let diff = money - coins[i];
      const currentCount = 1 + dp[diff];
      if (minCount > currentCount) {
        minCount = currentCount;
      }
    }
    dp[money] = minCount;
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

export function coinChange(coins: number[], amount: number): number {
  coins.sort((a, b) => a - b);
  const total = _change(coins, amount);
  return total === Infinity ? -1 : total;
}
