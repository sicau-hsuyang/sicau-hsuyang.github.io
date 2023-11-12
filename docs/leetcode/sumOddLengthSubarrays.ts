export function sumOddLengthSubarrays(arr: number[]): number {
  // 1-LENGTH
  const sumArr: number[] = [0];
  for (let i = 0; i < arr.length; i++) {
    sumArr[i + 1] = arr[i] + sumArr[i];
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j += 2) {
      sum += sumArr[j + 1] - sumArr[i];
    }
  }
  return sum;
}
