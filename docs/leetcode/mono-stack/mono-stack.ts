function top<T>(arr: T[]) {
  if (!arr.length) {
    throw new Error("insufficient el");
  }
  return arr[arr.length - 1];
}

export function monoStack(nums: number[]) {
  const stack: number[] = [];
  // 全部初始化为-1，记录当前元素左侧的小于它的最近的元素，没有则为-1
  const leftCloseRecord: number[] = nums.map((v) => {
    return -1;
  });
  // 全部初始化为-1，记录当前元素右侧的大于它的最近的元素，没有则为-1
  const rightClosRecord: number[] = nums.map((v) => {
    return -1;
  });
  for (let i = 0; i < nums.length; i++) {
    const el = nums[i];
    // 如果栈中有元素，并且栈顶元素小于当前要进入的元素
    while (stack.length && nums[top(stack)] > el) {
      // 记录当前栈顶元素右侧最近比它小的元素
      rightClosRecord[top(stack)] = nums[i];
      // 否则，不断的弹出
      stack.pop();
    }
    // 如果栈中还有元素，这个栈顶的元素距离右侧最近
    if (stack.length) {
      const pos = top(stack);
      // 即可求得当前元素它的左侧小于它的最近的元素是栈顶的元素
      leftCloseRecord[i] = nums[pos];
      // 记录栈顶元素右侧距离它最近且小于它的数
    }
    // 将索引加入到栈中
    stack.push(i);
  }
  // 清算
  nums.forEach((num, idx) => {
    console.log(
      `当前数字：${num},左边距离当前数字最近最小，${
        idx === -1 ? "不存在" : leftCloseRecord[idx]
      }，右边距离当前数字最近最小${
        idx === -1 ? "不存在" : rightClosRecord[idx]
      }`
    );
  });
  return leftCloseRecord;
}
