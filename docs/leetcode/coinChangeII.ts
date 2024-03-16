export function change(amount: number, coins: number[]): number {
  const dp: number[] = Array.from({
    length: amount + 1,
  }).fill(0) as number[];
  dp[0] = 0;
  let min = Math.min(...coins);
  for (let i = min; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        dp[i] = dp[i] + dp[i - coins[j]] + 1;
      }
    }
  }
  return dp[amount] > amount ? 0 : dp[amount];
}

/**
 
dp[j] = max{ dp[j-1], dp[j-weight[i]] + value[i] }

for(let i = 0;i<value.length;i++) {
  for(let j = bagWeight; j>=weight[i]; j--) {
    if(j>= weight[i]) {
      dp[j] = max{ dp[j-1], dp[j-weight[i]] + value[i] }
    }
  }
}

*/
