/**
 Do not return anything, modify A in-place instead.
 */
export function merge(A: number[], m: number, B: number[], n: number): void {
  let p1 = 0;
  let p2 = 0;
  let count = 0;
  while (p1 < m && p2 < n) {
    let num1 = A[p1];
    let num2 = B[p2];
    if (num1 < num2) {
      // 什么都不做
      p1++;
      count++;
    } else if (num2 <= num1) {
      if (num2 === num1) {
        // 代表先把A本来都元素合并进去
        p1++;
        count++;
      }
      let end = m + count;
      while (end > p1) {
        A[end] = A[end - 1];
        end--;
      }
      A[p1] = num2;
      p2++;
      p1++;
      count++;
    }
  }
  // 如果B数组还没有合并完
  while (p2 < n) {
    // 比较最后一个元素的大小
    if (A[p1] < B[p2]) {
      A[p1 + 1] = B[p2];
      p1++;
      p2++;
    } else {
      A[p1 + 1] = A[p1];
    }
  }
}
