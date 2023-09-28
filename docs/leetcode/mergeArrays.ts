export function mergeArrays(nums1: number[][], nums2: number[][]): number[][] {
  let p1 = 0;
  let p2 = 0;
  const results: number[][] = [];
  while (p1 < nums1.length && p2 < nums2.length) {
    let tmp1 = nums1[p1];
    let tmp2 = nums2[p2];
    if (tmp1[0] < tmp2[0]) {
      results.push(tmp1);
      p1++;
    } else if (tmp2[0] < tmp1[0]) {
      results.push(tmp2);
      p2++;
    } else {
      const res = [tmp1[0], tmp1[1] + tmp2[1]];
      results.push(res);
      p1++;
      p2++;
    }
  }

  while (p1 < nums1.length) {
    let tmp1 = nums1[p1];
    results.push(tmp1);
    p1++;
  }

  while (p2 < nums2.length) {
    let tmp2 = nums2[p2];
    results.push(tmp2);
    p2++;
  }
  return results;
}
