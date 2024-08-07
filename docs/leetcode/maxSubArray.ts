// export function maxSubArray(arr: number[]) {
//   return findMaxPartition(arr, 0, arr.length - 1);
// }

// function findMaxPartition(arr: number[], left: number, right: number) {
//   if (left < right) {
//     let mid = Math.floor((left + right) / 2);
//     // 这儿不能写出mid-1和mid啊，因为mid-1有可能比right小，程序就出问题了，
//     // 所以说在分治算法的时候都要写成mid和mid+1，这样才能保证递归过程中right永远比left大
//     // 比如left 1 right 2 mid就是1，mid+1就是2，但是如果是mid-1 就是0，这就是问题
//     const leftMax = findMaxPartition(arr, left, mid);
//     const rightMax = findMaxPartition(arr, mid + 1, right);
//     const crossMidMax = findCrossMidMax(arr, left, mid, right);
//     return Math.max(leftMax, rightMax, crossMidMax);
//   } else {
//     return arr[left];
//   }
// }

// function findCrossMidMax(
//   arr: number[],
//   left: number,
//   mid: number,
//   right: number
// ) {
//   let leftMidMax = -Infinity;
//   let preLeftSum = 0;
//   for (let i = mid; i >= left; i--) {
//     const num = arr[i];
//     preLeftSum += num;
//     if (preLeftSum > leftMidMax) {
//       leftMidMax = preLeftSum;
//     }
//   }
//   let rightMidMax = -Infinity;
//   let preRightSum = 0;
//   for (let i = mid + 1; i <= right; i++) {
//     const num = arr[i];
//     preRightSum += num;
//     if (preRightSum > rightMidMax) {
//       rightMidMax = preRightSum;
//     }
//   }
//   const crossMidMax = leftMidMax + rightMidMax;
//   return crossMidMax;
// }

export function maxSubArray(nums: number[]): number {
  let prev = nums[0];
  let max = prev;
  for (let i = 1; i < nums.length; i++) {
    // 算上当前
    prev = Math.max(prev + nums[i], nums[i]);
    if (max < prev) {
      max = prev;
    }
  }
  return max;
}