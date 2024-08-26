export function lenLongestFibSubseq(arr: number[]): number {
  const dp: { num1: number; num2: number; len: number }[] = [];
  // /
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j].num1 + dp[j].num2 === arr[i]) {
        dp[i].num1 = dp[j].num2;
        dp[i].num2 = arr[i];
        dp[i].len = dp[j].len + 1;
      }
    }
  }
  return 0;
}
