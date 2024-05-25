function top<T>(stack: T[]): T {
  return stack[stack.length - 1];
}

export function dailyTemperatures(temperatures: number[]): number[] {
  const minMonoStack: number[] = [];
  const results: number[] = Array.from({
    length: temperatures.length,
  }).fill(0) as number[];
  for (let i = 0; i < temperatures.length; i++) {
    const T = temperatures[i];
    // 单调栈内的元素必须是由大到小排布的
    while (minMonoStack.length && temperatures[top(minMonoStack)] < T) {
      // 弹出栈顶的元素，因为存的是索引
      const topPos = minMonoStack.pop()!;
      // 计算两个元素之间的距离
      const distance = i - topPos;
      // 更新这个位置X天后有温度更高的日期
      results[topPos] = distance;
    }
    // 将当前元素的索引加入到栈中
    minMonoStack.push(i);
  }
  return results;
}
