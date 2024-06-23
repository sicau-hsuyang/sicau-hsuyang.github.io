/**
 * 二分查找，找到小于等于target的最近索引
 * @param arr 原数组
 * @param target 目标值
 * @returns
 */
export function binarySearch(arr: number[], target: number) {
  // 如果在范围外面
  let res: number = -1;
  if (arr[0] > target) {
    return res;
  }
  if (arr[arr.length - 1] < target) {
    return arr.length - 1;
  }
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);
  while (left <= right) {
    if (target == arr[mid]) {
      res = mid;
      break;
    } else if (target > arr[mid]) {
      left = mid + 1;
      mid = Math.floor((left + right) / 2);
    } else if (target < arr[mid]) {
      right = mid - 1;
      mid = Math.floor((left + right) / 2);
    }
  }
  if (res === -1) {
    res = mid;
  }
  return res;
}

// 大的工作难度不一定代表有大的收益？？？
// 价值相同，难度不同
// 难度相同，价值不同

export function maxProfitAssignment(
  difficulty: number[],
  profit: number[],
  worker: number[]
): number {
  const map = new Map();
  // O(N)，记录每个工作难度的最大收益
  for (let idx = 0; idx < difficulty.length; idx++) {
    const diff = difficulty[idx];
    const profitNum = profit[idx];
    const exist = map.get(diff) || -1;
    // 没有记录，直接设置
    if (exist === -1) {
      map.set(diff, profitNum);
    }
    // 如果有更大的收益，才更新
    else if (exist !== -1 && exist < profitNum) {
      map.set(diff, profitNum);
    }
  }
  // O(N*LogN)
  // 根据难度从小到大的排序
  difficulty.sort((a, b) => a - b);
  let tempMaxProfit = 0;
  const realProfitArr: number[] = [];
  // O(N)
  for (let i = 0; i < difficulty.length; i++) {
    const diff = difficulty[i];
    // 真正的
    const realProfit = map.get(diff);
    realProfitArr[i] = realProfit;
    if (realProfitArr[i] > tempMaxProfit) {
      tempMaxProfit = realProfitArr[i];
    }
    // 如果当前的收益小于之前难度较小的工作的收益，则更新收益
    if (realProfitArr[i] < tempMaxProfit) {
      realProfitArr[i] = tempMaxProfit;
    }
  }
  let maxProfit = 0;
  // O(N)
  for (let i = 0; i < worker.length; i++) {
    const p = worker[i];
    // Log(N)
    const targetIdx = binarySearch(difficulty, p);
    if (targetIdx !== -1) {
      maxProfit += realProfitArr[targetIdx];
    }
  }
  return maxProfit;
}
