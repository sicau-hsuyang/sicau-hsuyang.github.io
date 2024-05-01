export function advantageCount(nums1: number[], nums2: number[]): number[] {
  const copyArr1 = nums1.map((v) => v);
  // 从小到大进行排序
  copyArr1.sort((a, b) => {
    return a - b;
  });
  let left = 0;
  let right = copyArr1.length - 1;

  for (let i = 0; i < nums2.length; i++) {
    const val = nums2[i]
    while (left <= right) {
      
    }
  }
}
