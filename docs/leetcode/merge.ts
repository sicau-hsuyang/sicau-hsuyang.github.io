/**
 Do not return anything, modify A in-place instead.
 */
export function merge(A: number[], m: number, B: number[], n: number): void {
  const tempA: number[] = [];
  for (let i = 0; i < m; i++) {
    tempA.push(A[i]);
  }
  let k = 0;
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (tempA[i] < B[j]) {
      A[k++] = tempA[i++];
    } else if (tempA[i] > B[j]) {
      A[k++] = B[j++];
    } else {
      A[k++] = tempA[i++];
      A[k++] = B[j++];
    }
  }
  while (i < m) {
    A[k++] = tempA[i++];
  }
  while (j < n) {
    A[k++] = B[j++];
  }
}
