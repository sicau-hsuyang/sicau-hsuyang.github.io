export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[]
): number {
  // 有一个数组长度为0
  if (nums1.length === 0 || nums1.length === 0) {
    const arr = nums1.length === 0 ? nums2 : nums1;
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 === 0
      ? Number.parseFloat(((arr[mid] + arr[mid + 1]) / 2).toFixed(5))
      : arr[mid];
  } else {

  }
}

// A数组很大 B数组很小，并且B数组的所有数字都在A数字的范围内