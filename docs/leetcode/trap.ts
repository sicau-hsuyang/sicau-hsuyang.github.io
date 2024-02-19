export function trap(height: number[]): number {
  let total = 0;
  let left = 0;
  let right = height.length - 1;
  // 记住左边最高的柱子所在的位置
  let leftMaxPos = left;
  // 记住右边最高的柱子所在的位置
  let rightMaxPos = right;
  let leftMaxHeight = height[left];
  let rightMaxHeight = height[right];
  while (left < right) {
    let nextLeft = left + 1;
    let nextRight = right - 1;
    // 下一个左边的柱子比当前左边的大，防止漏算
    if (height[nextLeft] >= leftMaxHeight) {
      let tempLeft = left;
      // 向左边找，找这一区间能接到的所有雨水
      while (tempLeft > leftMaxPos) {
        // 左边柱子的最高值，除开柱子当前的厚度，表示在这一阶段能接到的雨水
        let water = leftMaxHeight - height[tempLeft];
        if (water > 0) {
          total += water;
        }
        tempLeft--;
      }
      // 更新最大的柱子，记住柱子所在的位置
      leftMaxHeight = height[nextLeft];
      leftMaxPos = nextLeft;
    }
    // 下一个右边的柱子比当前右边的大
    if (height[nextRight] >= rightMaxHeight) {
      let tempRight = right;
      // 向右边找，找这一区间能接到的所有雨水
      while (tempRight < rightMaxPos) {
        // 右边柱子的最高值，除开柱子当前的厚度，表示在这一阶段能接到的雨水
        let water = rightMaxHeight - height[tempRight];
        if (water > 0) {
          total += water;
        }
        tempRight++;
      }
      // 更新最大柱子，记住柱子所在的位置
      rightMaxHeight = height[nextRight];
      rightMaxPos = nextRight;
    }
    let leftCp = height[nextLeft];
    let rightCp = height[nextRight];
    // 当前的左右两根柱子都是比较大的
    if (leftCp <= rightMaxHeight && leftCp <= leftMaxHeight) {
      left = nextLeft;
    }
    // 当前的左右两根柱子都是比较大的
    if (rightCp <= leftMaxHeight && rightCp <= rightMaxHeight) {
      right = nextRight;
    }
  }
  // 计算最后两根较大的柱子之间能接的雨水的量
  for (let i = leftMaxPos + 1; i < rightMaxPos; i++) {
    const block = Math.min(leftMaxHeight, rightMaxHeight);
    const water = block - height[i];
    if (water > 0) {
      total += water;
    }
  }
  return total;
}
