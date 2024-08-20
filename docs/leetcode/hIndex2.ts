export function hIndex(citations: number[]): number {
  // 全部都是
  if (citations.length && citations[0] >= citations.length) {
    return citations.length;
  }
  // 全部都不是
  if (citations.length && citations[citations.length - 1] === 0) {
    return 0;
  }
  let n = citations.length;
  let left = 0;
  let right = n - 1;
  let mid = Math.floor((left + right) / 2);
  let len = n - mid;
  while (left < right) {
    // 找到了
    if (citations[mid] === len) {
      break;
    } else if (citations[mid] > len) {
      right = mid;
    } else {
      left = mid + 1;
    }
    mid = Math.floor((left + right) / 2);
    len = n - mid;
  }
  return len;
}
