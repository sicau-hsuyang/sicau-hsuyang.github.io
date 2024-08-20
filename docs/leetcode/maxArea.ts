export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let area = 0;
  while (left < right) {
    let tempArea = Math.min(height[left], height[right]) * (right - left);
    area = Math.max(area, tempArea);
    if (height[left] > height[right]) {
      right--;
    } else {
      left++;
    }
  }
  return area;
}
