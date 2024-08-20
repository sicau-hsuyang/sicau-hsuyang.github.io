interface Struct {
  value: number;
  index: number;
}

function useMonoQueue() {
  const queue: Struct[] = [];

  /**
   * 将窗口值加入到单调队列
   * @param param0
   */
  function enqueue({ value, index }: Struct) {
    while (queue.length && queue[queue.length - 1].value <= value) {
      // 从右侧出队
      queue.pop();
    }
    queue.push({
      value,
      index,
    });
  }

  /**
   * 将单调队列中小于 索引小于等于 offset的内容从窗口里面弹出
   * @param offset
   */
  function dequeue(offset: number) {
    while (queue.length && queue[0].index <= offset) {
      queue.shift();
    }
  }

  /**
   * 获取单调队列的最大值
   * @returns
   */
  function getMax(): number {
    return queue.length && queue[0].value;
  }

  return {
    enqueue,
    dequeue,
    getMax,
  };
}

export function maxSlidingWindow(nums: number[], k: number): number[] {
  const res: number[] = [];
  const { enqueue, dequeue, getMax } = useMonoQueue();
  for (let i = 0; i < k; i++) {
    enqueue({
      value: nums[i],
      index: i,
    });
  }
  res.push(getMax());
  let left = 0;
  for (let right = k; right < nums.length; right++) {
    dequeue(left++);
    enqueue({
      value: nums[right],
      index: right,
    });
    res.push(getMax());
  }
  return res;
}
