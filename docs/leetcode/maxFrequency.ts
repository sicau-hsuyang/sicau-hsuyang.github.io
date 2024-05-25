export function maxFrequency(nums: number[], k: number): number {
  // 用于记住每个数的频数
  const map: Map<number, number> = new Map();
  // 先对数组进行排序
  nums.sort((a, b) => {
    return a - b;
  });
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    const count = map.get(num) || 0;
    if (count === 0) {
      map.set(num, 1);
    } else {
      map.set(num, count + 1);
    }
  }
  let maxDistance = 1;
  let windowK = k;
  let left = 0;
  for (let right = 1; right < len; right++) {
    const preNum = nums[right - 1];
    const curNum = nums[right];
    // 不相同，则尝试将前面的都上台阶？
    if (preNum < curNum) {
      // 获取之前的数字的个数
      const preNumCount = map.get(preNum)!;
      // 需要操作这么多次才能将其变来跟当前数字相同
      const distance = (curNum - preNum) * preNumCount;
      // 减去操作的次数
      if (windowK >= distance) {
        windowK -= distance;
      }
      // 已经到极限了，没办法把之前的再增加了
      else {
        // 本来是right-1-left+1，直接简化成right-left
        const D = right - left;
        if (D > maxDistance) {
          console.log(nums.slice(left, right));
          maxDistance = D;
        }
        // 将left滑动到下一个位置，并重置windowK
        const oldLeftNum = nums[left];
        const oldLeftCount = map.get(oldLeftNum)!;
        left += oldLeftCount;
        const newLeftNum = nums[left];
        // 因为在这儿花费了这么多个频次，在下个位置补上
        const addDistance = (newLeftNum - oldLeftNum) * oldLeftCount;
        windowK += addDistance;
      }
    }
  }
  if (windowK >= 0) {
    // 本来是right-1-left+1，直接简化成right-left
    const D = len - left;
    if (D > maxDistance) {
      console.log(nums.slice(left, len));
      maxDistance = D;
    }
  }
  return maxDistance;
}
