function top<T>(arr: T[]) {
  if (!arr.length) {
    throw new Error("insufficient el");
  }
  return arr[arr.length - 1];
}

interface Struct {
  left: {
    pos: number;
    num: number;
  };
  num: number;
  right: {
    pos: number;
    num: number;
  };
}

/**
 * 单调增栈，用来请1个数字距离其左右最近的最小值
 * @param nums
 * @returns
 */
function monoIncreaseStack(nums: number[]) {
  const stack: number[] = [];
  // 全部初始化为-1，记录当前元素左侧的小于它的最近的元素，没有则为-1
  const closeSmallRecord: Struct[] = nums.map((v) => {
    return {
      left: {
        pos: -1,
        num: NaN,
      },
      num: v,
      right: {
        pos: -1,
        num: NaN,
      },
    };
  });
  for (let i = 0; i < nums.length; i++) {
    const el = nums[i];
    // 如果栈中有元素，并且栈顶元素小于当前要进入的元素
    while (stack.length && nums[top(stack)] >= el) {
      // 记录当前栈顶元素右侧最近比它小的元素
      closeSmallRecord[top(stack)].right = {
        pos: i,
        num: nums[i],
      };
      // 否则，不断的弹出
      stack.pop();
    }
    // 如果栈中还有元素，这个栈顶的元素距离右侧最近
    if (stack.length) {
      const pos = top(stack);
      // 即可求得当前元素它的左侧小于它的最近的元素是栈顶的元素
      closeSmallRecord[i].left = {
        pos,
        num: nums[pos],
      };
      // 记录栈顶元素右侧距离它最近且小于它的数
    }
    // 将索引加入到栈中
    stack.push(i);
  }
  // 清算阶段
  while (stack.length) {
    const pos = stack.pop()!;
    // 如果栈中还有元素，这个栈顶的元素距离右侧最近
    if (stack.length) {
      // 即可求得当前元素它的左侧小于它的最近的元素是栈顶的元素
      closeSmallRecord[pos].left = {
        pos: top(stack),
        num: nums[top(stack)],
      };
      // 记录栈顶元素右侧距离它最近且小于它的数
    }
  }
  // 修数据
  for (let i = closeSmallRecord.length - 1; i >= 0; i--) {
    if (
      closeSmallRecord[closeSmallRecord[i].right.pos] &&
      closeSmallRecord[i].num ===
        closeSmallRecord[closeSmallRecord[i].right.pos].num
    ) {
      closeSmallRecord[i].right =
        closeSmallRecord[closeSmallRecord[i].right.pos].right;
    }
  }
  return closeSmallRecord;
}

export function largestRectangleArea(heights: number[]): number {
  const res = monoIncreaseStack(heights);
  let maxArea = 0;
  res.forEach((config, idx) => {
    if (config.num === 0) {
      return;
    }
    // 左边界
    let leftHeight;
    let left;
    if (config.left.pos === -1) {
      leftHeight = config.num;
      left = 0;
    } else {
      leftHeight = config.left.num;
      left = config.left.pos;
    }
    let left1Height = heights[left + 1] || 0;
    // 右边界
    let rightHeight;
    let right;
    if (config.right.pos === -1) {
      rightHeight = config.num;
      right = heights.length - 1;
    } else {
      rightHeight = config.right.num;
      right = config.right.pos;
    }
    let right1Height = heights[right - 1] || 0;
    // 取左右边界一起算
    let D3 = right - left + 1;
    // 取左边界到自己
    let D1 = idx - left + 1;
    // 取自己到右边界
    let D2 = right - idx + 1;
    let D4 = right - left;
    const area1 = Math.min(leftHeight, config.num) * D1;
    const area2 = Math.min(rightHeight, config.num) * D2;
    const area3 = Math.min(leftHeight, rightHeight) * D3;
    const area4 = config.num;
    const area5 = Math.min(left1Height, rightHeight) * D4;
    const area6 = Math.min(leftHeight, right1Height) * D4;
    const area7 = Math.min(left1Height, right1Height, config.num) * (D3 - 2);
    maxArea = Math.max(
      maxArea,
      area3,
      area1,
      area2,
      area4,
      area5,
      area6,
      area7
    );
  });
  return maxArea;
}
