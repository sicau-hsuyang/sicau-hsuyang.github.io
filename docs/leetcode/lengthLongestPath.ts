export function lengthLongestPath(input: string): number {
  if (/\n/.test(input)) {
    // 如果
    // .txt
    const lastPosOfPoint = input.indexOf(".");
    return lastPosOfPoint <= input.length - 2 ? input.length : 0;
  }
}
