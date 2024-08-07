export function findPairs(nums: number[], k: number): number {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const cnt = map.get(num) || 0;
    if (cnt === 0) {
      map.set(num, 1);
    } else {
      map.set(num, cnt + 1);
    }
  }
  const sortRes = [...map.entries()].sort((a, b) => {
    return a[0] - b[0];
  });
  let total = 0;
  for (let i = 0; i < sortRes.length; i++) {
    const num = sortRes[i][0];
    const target = num + k;
    const cnt = map.get(target) || 0;
    // 当前取一个，另外一边再取一个
    if ((k === 0 && cnt >= 2) || (k > 0 && cnt > 0)) {
      total += 1;
    }
  }
  return total;
}
