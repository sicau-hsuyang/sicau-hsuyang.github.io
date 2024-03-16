export function canMakeArithmeticProgression(arr: number[]): boolean {
  arr.sort((a, b) => a - b);
  let D = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] !== D) {
      return false;
    }
  }
  return true;
}
