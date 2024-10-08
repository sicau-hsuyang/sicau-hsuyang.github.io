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

export function monoStack(nums: number[]) {
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
  // 清算
  closeSmallRecord.forEach((res, idx) => {
    console.log(
      `当前数字：${res.num},距离当前数字左边最近最小的数字是:${
        res.left.pos === -1 ? "不存在" : res.left.num
      }，距离当前数字右边最近最小的数字是:${
        res.right.pos === -1 ? "不存在" : res.right.num
      }`
    );
  });
  return closeSmallRecord;
}
