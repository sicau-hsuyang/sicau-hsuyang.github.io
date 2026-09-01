export function longestArithSeqLength(nums: number[]): number {
  let maxDistance = 1;
  const map: Map<number, Map<number, number>> = new Map();
  const countMap: Map<number, number> = new Map();
  countMap.set(nums[0], 1);
  for (let i = 1; i < nums.length; i++) {
    let cnt = countMap.get(nums[i]) || 0;
    countMap.set(nums[i], cnt + 1);
    for (let j = 0; j < i; j++) {
      let D = nums[i] - nums[j];
      // 因为0可能会多次统计，因此拿出来单独统计
      if (D === 0) {
        continue;
      }
      // 获取到以D结尾的所有等差序列
      let subMap = map.get(D);
      if (!subMap) {
        subMap = new Map();
        map.set(D, subMap);
      }
      let tempD: number;
      // 不存在这条记录，不能用0去判断
      if (!subMap.has(nums[j])) {
        subMap.set(nums[i], 2);
        tempD = 2;
      } else {
        // 获取到以nums[j]结尾的最长等差序列的长度
        const distance = subMap.get(nums[j])!;
        // 将num[i]作为以D为公差，结尾为num[i]的最长等差子序列
        subMap.set(nums[i], distance + 1);
        tempD = distance + 1;
      }
      maxDistance = Math.max(maxDistance, tempD);
    }
  }
  // 统计D为0的最大等差数组
  for (const cnt of countMap.values()) {
    maxDistance = Math.max(maxDistance, cnt);
  }
  return maxDistance;
}

JSON.stringify(
  Array.from({
    length: 1000,
  }).map(() => {
    return Math.floor(Math.random() * 501);
  })
);
