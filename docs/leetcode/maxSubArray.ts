export function maxSubArray(arr: number[]) {
  return findMaxPartition(arr, 0, arr.length);
}

function findMaxPartition(arr: number[], left: number, right: number) {
  if (left >= right) {
    return Math.max(arr[left], 0);
  }
  let mid = Math.floor((left + right) / 2);
  const leftMax = findMaxPartition(arr, left, mid - 1);
  const rightMax = findMaxPartition(arr, mid, right);
  const crossMidMax = findCrossMidMax(arr, left, mid, right);
  return Math.max(leftMax, rightMax, crossMidMax);
}

function findCrossMidMax(
  arr: number[],
  left: number,
  mid: number,
  right: number
) {
  let leftMidMax = -Infinity;
  let preLeftSum = 0;
  for (let i = mid - 1; i >= left; i--) {
    const num = arr[i];
    preLeftSum += num;
    if (preLeftSum > leftMidMax) {
      leftMidMax = preLeftSum;
    }
  }
  let rightMidMax = -Infinity;
  let preRightSum = 0;
  for (let i = mid; i <= right; i++) {
    const num = arr[i];
    preRightSum += num;
    if (preRightSum > rightMidMax) {
      rightMidMax = preRightSum;
    }
  }
  const crossMidMax = leftMidMax + rightMidMax;
  return crossMidMax;
}
