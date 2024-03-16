function testWeightBagProblem(
  weight: number[],
  value: number[],
  size: number
): number {
  const goodsNum: number = weight.length;
  const dp: number[] = new Array(size + 1).fill(0);
  for (let i = 0; i < goodsNum; i++) {
    for (let j = size; j >= weight[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    }
  }
  return dp[size];
}

export function main() {
  const weight = [1, 3, 4];
  const value = [15, 20, 30];
  const size = 4;
  console.log(testWeightBagProblem(weight, value, size));
}
