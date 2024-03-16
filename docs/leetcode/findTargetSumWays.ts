function findTargetSumWays(nums: number[], target: number): number {
  // 背包的总重量是target
  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j > 0; j--) {}
  }
}

/**
 每个位置上选 - +
 */

/**
 
 for(let i = 0 ;i<value.length;i++) {
  for(let j = bagWeight;j>=weight[i];j--) {
    dp[j] = Math.min(dp[j], dp[j-weight[i]] + value[i])
  }
 }

  */
