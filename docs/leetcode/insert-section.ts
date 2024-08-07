export function insert(
  intervals: number[][],
  newInterval: number[]
): number[][] {
  const results: number[][] = [];
  let insertStart = false;
  let insertRight = false;
  for (let i = 0; i < intervals.length; i++) {
    const inter = intervals[i];
    // 还没有插入左值
    if (!insertStart) {
      // 当前区间的右边的值仍然比左值小，可以直接插入，否则就要开始准备插入了
      if (inter[1] >= newInterval[0]) {
        insertStart = true;
      }
      results.push(inter);
    }
    // 插入了左值，但是还没有插入右值
    else if (insertStart && !insertRight) {
      // 右值比较大
      if (newInterval[1] > inter[1]) {
        continue;
      } else if (newInterval[1] < inter[0]) {
        // TODO: 如果newInterval比最后一个的left还要小
        // 如果至少存在一个元素
        if (results[results.length - 1]) {
          const temp = results.pop()!;
          const left = Math.min(newInterval[0], temp[0]);
          results.push([left, newInterval[1]]);
        } else {
          results.push(newInterval);
        }
        results.push(inter);
      }
      // 相同的话
      else if (newInterval[1] === inter[0]) {
        // TODO: 如果newInterval比最后一个的left还要小
        // 如果至少存在一个元素
        if (results[results.length - 1]) {
          const temp = results.pop()!;
          const left = Math.min(newInterval[0], temp[0]);
          results.push([left, inter[1]]);
        } else {
          results.push([newInterval[0], inter[1]]);
        }
      } else if (newInterval[1] > inter[0] && newInterval[1] <= inter[1]) {
        //
      }
    }
    // 插入完成了，直接合并
    else {
      results.push(inter);
    }
  }
  return results;
}

/**
 原区间：[3,4]
 插入：[1,2]


 原区间[1,2]
 插入：[3,4]

 原区间 [1,2], [5, 8]
 插入 [3,4]

 原区间[1,2], [6,7]
 插入 [3,5]

 原区间[1,2], [3,6]
 新区间[3,4]

 原区间[1,2], [3,4]
 新区间[4, 8]
 * 
 */
