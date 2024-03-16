export function coinChange(coins: number[], amount: number): number {
  const dp: number[] = Array.from({
    length: amount + 1,
  }).fill(amount + 1) as number[];
  dp[0] = 0;
  let min = Math.min(...coins);
  for (let i = min; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        const select = dp[i - coins[j]] + 1;
        if (select < dp[i]) {
          dp[i] = select;
        }
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}

/**

dp[i] = dp[k] + d[i-k]

 */
