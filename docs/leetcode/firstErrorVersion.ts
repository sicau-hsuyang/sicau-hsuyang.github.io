/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

export function solution(isBadVersion: (v: number) => boolean) {
  return function (n: number): number {
    let left = 1;
    let right = n;
    // 如果只有一个版本
    if (n === 1) {
      return isBadVersion(1) ? 1 : -1;
    }
    const leftVersionError = isBadVersion(left);
    // 如果第一个版本就是错误的，那好办，直接返回
    if (leftVersionError) {
      return 1;
    }
    const rightVersionError = isBadVersion(right);
    // 如果最后一个版本也是正确的，说明没有错误的版本
    if (!rightVersionError) {
      return -1;
    }
    let mid = Math.floor((left + right) / 2);
    let midVersionError = isBadVersion(mid);
    let target: number;
    while (true) {
      // 如果中间的版本是正确的，那么出问题的在后面
      if (!midVersionError) {
        if (left + 1 === right) {
          target = right;
          break;
        } else {
          left = mid + 1;
          mid = Math.floor((left + right) / 2);
          midVersionError = isBadVersion(mid);
        }
      } else {
        if (left === right) {
          target = right;
          break;
        } else if (left + 1 === right) {
          target = left;
          break;
        } else {
          // 必须要包含右边的版本，因为这个版本是出问题的，不能将其遗漏了
          right = mid;
          mid = Math.floor((left + right) / 2);
          midVersionError = isBadVersion(mid);
        }
      }
    }
    return target;
  };
}
