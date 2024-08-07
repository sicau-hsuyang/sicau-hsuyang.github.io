export function findDiagonalOrder(nums: number[][]): number[] {
  let res: number[] = [];
  let maxLength = -Infinity;
  for (let row = 0; row < nums.length; row++) {
    if (nums[row].length > maxLength) {
      maxLength = nums[row].length;
    }
    let start = row;
    let right = 0;
    while (start >= 0) {
      if (typeof nums[start][right] !== "undefined") {
        res.push(nums[start][right]);
      }
      start--;
      right++;
    }
  }
  for (let col = 1; col < maxLength; col++) {
    let start = nums.length - 1;
    let right = col;
    while (start >= 0 && right < maxLength) {
      if (typeof nums[start][right] !== "undefined") {
        res.push(nums[start][right]);
      }
      right++;
      start--;
    }
  }
  return res;
}
