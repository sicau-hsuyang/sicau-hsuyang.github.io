function findIntersection(arr1: number[], arr2: number[]): number {
  if (arr1.length === 0 || arr2.length === 0) {
    return [];
  }
  const [min1, max1] = arr1;
  const [min2, max2] = arr2;
  let left = Math.max(min1, min2);
  let right = Math.min(max1, max2);
  return [left, right];
}

export function intervalIntersection(
  firstList: number[][],
  secondList: number[][]
): number[][] {
  const results: number[][] = []
  let 
}
