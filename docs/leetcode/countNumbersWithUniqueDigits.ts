export function countNumbersWithUniqueDigits(n: number): number {
  const dp: number[] = [1, 10];
  for (let i = 2; i <= n; i++) {
    let S = 1;
    let top = 9;
    let counter = 0;
    for (let k = i; k > 0; k--) {
      S *= top;
      counter++;
      if (counter >= 2) {
        top--;
      }
    }
    dp[i] = dp[i - 1] + S;
  }
  return dp[n];
}
