export function numTrees(n: number): number {
  if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  } else {
    const dp: number[] = [1, 1, 2];
    for (let i = 3; i <= n; i++) {
      dp[i] = 0;
      for (let k = 1; k <= i; k++) {
        const dpLeft = dp[i - k];
        const dpRight = dp[k - 1];
        dp[i] += dpLeft * dpRight;
      }
    }
    return dp[n];
  }
}

/**

dp[0] = 0;

dp[1] = 1;

dp[2] = 2;

dp[3] = 以3为头节点+以2为头结点+以1为头结点，
即dp[2] * dp[0] + dp[1] * dp[1] + dp[0] * dp[2]

// 以i为头结点的二叉搜索树的情况
dp[i] = dp[j-1] * dp[i-j];

 */
