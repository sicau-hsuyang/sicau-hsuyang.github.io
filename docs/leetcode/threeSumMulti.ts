export function threeSumMulti(arr: number[], target: number): number {
  let total = 0;
  arr.sort((a, b) => a - b);
  const LIMIT = 10 ** 9 + 7;
  for (let i = 0; i < arr.length - 2; i++) {
    let start = i + 1;
    let end = arr.length - 1;
    while (start < end) {
      let sum = arr[i] + arr[start] + arr[end];
      if (sum === target) {
        if (arr[start] !== arr[end]) {
          let offsetStart = start + 1;
          while (arr[offsetStart] === arr[start] && offsetStart < end) {
            offsetStart++;
          }
          let offsetEnd = end - 1;
          while (arr[offsetEnd] === arr[end] && offsetEnd > start) {
            offsetEnd--;
          }
          let distanceStart = offsetStart - start;
          let distanceEnd = end - offsetEnd;
          // 从左边选一个，从右边选一个，因为方案数直接是相乘
          const stepTotal = distanceStart * distanceEnd;
          total += stepTotal;
          total %= LIMIT;
          start = offsetStart;
          end = offsetEnd;
        } else {
          // 这儿是组合，从一个集合里面选2个，就C[N,2],即组合公式N*(N-1)/2*1
          const distance = end - start + 1;
          total += (distance * (distance - 1)) / 2;
          total %= LIMIT;
          // 中间已经不可能有内容了，所以可以直接终止循环了
          break;
        }
      } else if (sum < target) {
        start++;
      } else if (sum > target) {
        end--;
      }
    }
  }
  return total;
}
