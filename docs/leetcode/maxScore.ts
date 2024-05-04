export function maxScore(cardPoints: number[], k: number): number {
  const len = cardPoints.length;
  // 不选的窗口
  const unselectK = len - k;
  let sum = 0;
  let left = 0;
  let unselectSum = 0;
  for (let i = 0; i < unselectK; i++) {
    sum += cardPoints[i];
    unselectSum += cardPoints[i];
  }
  let minUnselectSum = unselectSum;
  for (let i = unselectK; i < len; i++) {
    sum += cardPoints[i];
    unselectSum -= cardPoints[left++];
    unselectSum += cardPoints[i];
    if (unselectSum < minUnselectSum) {
      minUnselectSum = unselectSum;
    }
  }
  return sum - minUnselectSum;
}
