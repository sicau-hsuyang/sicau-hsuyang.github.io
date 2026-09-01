export function insert(
  intervals: number[][],
  newInterval: number[]
): number[][] {
  const results: number[][] = [];
  let k = 0;
  // 先合并所有比interval小的，因为是无重叠的，因此可以直接合并
  while (k < intervals.length && intervals[k][1] < newInterval[0]) {
    results.push(intervals[k++]);
  }
  // 新插入的区间就是最大的区间
  if (k === intervals.length) {
    results.push(newInterval);
    return results;
  }
  let usedInterval = false;
  let sentinel = -1;
  const current = intervals[k];
  const compare = newInterval;
  if (compare[0] === current[0]) {
    results.push([compare[0], -1]);
    k++;
    usedInterval = true;
    sentinel = Math.max(compare[1], current[1]);
  } else if (current[0] < compare[0]) {
    results.push([current[0], -1]);
    k++;
    sentinel = current[1];
  } else if (current[0] > compare[0]) {
    results.push([compare[0], -1]);
    usedInterval = true;
    sentinel = compare[1];
  }
  while (k < intervals.length) {
    
  }
  return results;
}
