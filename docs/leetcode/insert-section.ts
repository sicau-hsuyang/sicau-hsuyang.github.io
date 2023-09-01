export function insert(
  intervals: number[][],
  newInterval: number[]
): number[][] {
  const results: number[][] = [];
  const leftTarget = newInterval[0];
  let leftInserted = false;
  const rightTarget = newInterval[1];
  let rightInserted = false;
  const temp: number[] = [];
  for (let i = 0; i < intervals.length; i++) {
    const curInterval = intervals[i];
    const left = curInterval[0];
    const right = curInterval[1];
    // 两个都插入了
    if (leftInserted && rightInserted) {
      temp.push(left);
      temp.push(right);
      temp.push(Infinity);
    } else if (leftInserted && !rightInserted) {
      // 左值插入，右值没有插入
      if (rightTarget < left) {
        rightInserted = true;
        temp.push(rightTarget);
        temp.push(right);
        temp.push(Infinity);
      } else if (right === rightTarget) {
        rightInserted = true;
        temp.push(rightTarget);
        temp.push(Infinity);
      } else {
        temp.push(right);
        temp.push(Infinity);
      }
    } else {
      // 左右值均没有插入
      if (left < leftTarget) {
        temp.push(left);
      } else if (left === leftTarget) {
        temp.push(left);
        leftInserted = true;
      } else if (left > leftTarget) {
        temp.push(leftTarget);
        leftInserted = true;
      }
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
