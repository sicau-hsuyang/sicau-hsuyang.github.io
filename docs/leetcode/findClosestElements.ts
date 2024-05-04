export function findClosestElements(
  arr: number[],
  k: number,
  x: number
): number[] {
  let distanceK = 0;
  let distLeft: number, distRight: number;
  for (let i = 0; i < k; i++) {
    const num = arr[i];
    const abs = Math.abs(x - num);
    distanceK += abs;
  }
  let minDistance = distanceK;
  distLeft = 0;
  distRight = k;
  let left = 0;
  for (let i = k; i < arr.length; i++) {
    const removeVal = arr[left++];
    const insertVal = arr[i];
    const removeAbs = Math.abs(removeVal - x);
    const insertAbs = Math.abs(insertVal - x);
    distanceK -= removeAbs;
    distanceK += insertAbs;
    if (distanceK < minDistance) {
      // result = arr.slice(left, i + 1);
      distLeft = left;
      distRight = i + 1;
      minDistance = distanceK;
    }
  }
  // console.log(arr.slice(distLeft, distRight))
  return arr.slice(distLeft, distRight);
}
