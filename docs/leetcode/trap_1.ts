export function trap(height: number[]): number {
  const stack: number[] = [];
  let total = 0;
  let len = 0;
  for (let i = 0; i < height.length; i++) {
    while (len && height[stack[len - 1]] < height[i]) {
      let top = stack.pop()!;
      len--;
      if (len) {
        let left = stack[len - 1];
        // 当前进来的元素
        const curHeight = Math.min(height[left], height[i]) - height[top];
        // 因为要刨开两个柱子本身不接水
        const curWidth = i - left - 1;
        const area = curHeight * curWidth;
        total += area;
      }
    }
    stack.push(i);
    len++;
  }
  return total;
}
