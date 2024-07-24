function calc(offset: number,  prefixSum: number[]) {

}

export function numberOfWays(s: string): number {
  const prefixSum: number[] = [0];
  // 前缀和
  let sum = Number.parseInt(s[0]);
  for (let i = 1; i < s.length; i++) {
    sum += Number.parseInt(s[i]);
    prefixSum[i] = sum;
  }
  return 0;
}
