function top<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

export function nextGreaterElements(nums: number[]): number[] {
  const minMonoStack: number[] = [];
  const len = nums.length;
  const results: number[] = Array.from({
    length: len,
  }).fill(-1) as number[];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    while (minMonoStack.length && nums[top(minMonoStack)] < num) {
      const pos = minMonoStack.pop()!;
      results[pos] = num;
    }
    minMonoStack.push(i);
  }
  // 清算阶段，这次就不需要再进元素了，只需要挨个弹一下栈内剩余的元素
  for (let i = 0; i < len && minMonoStack.length; i++) {
    const num = nums[i];
    while (minMonoStack.length && nums[top(minMonoStack)] < num) {
      const pos = minMonoStack.pop()!;
      results[pos] = num;
    }
  }
  return results;
}
