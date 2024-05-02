export function numberOfSubarrays(nums: number[], k: number): number {
  // 总的方案数
  let total = 0;
  // 窗口左指针
  let left = 0;
  // 窗口里面奇数的计数器
  let windowK = 0;
  // 记录每个奇数的数字所在的位置
  let oddNumsPos: number[] = [];
  for (let right = 0; right < nums.length; right++) {
    let num = nums[right];
    // 如果当前来的是偶数，直接加入到窗口中去
    if (num % 2 === 0) {
      continue;
    }
    // 如果窗口里面还没有这么多的奇数的话，直接放进去
    if (windowK < k) {
      // 将奇数的位置加入到记录的集合中去
      oddNumsPos.push(right);
      windowK++;
    } else {
      // 第一个奇数出现的位置
      const leftPos = oddNumsPos[0];
      // 第K个奇数出现的位置
      const rightPos = oddNumsPos[oddNumsPos.length - 1];
      const leftLength = leftPos - left;
      // 此刻已经是K+1个位置了，所以只有right-1之前才是满足K个奇数的窗口
      const rightLength = right - 1 - rightPos;
      // 本次方案数
      const totalPlan = leftLength * rightLength + leftLength + rightLength + 1;
      // console.log(nums.slice(left, right - 1 + 1));
      total += totalPlan;
      // 找到第一个奇数以后的位置，滑动到这个位置
      left = oddNumsPos[0] + 1;
      // 丢弃老一些的奇数位置
      oddNumsPos.shift();
      // 添加新一些的奇数位置到窗口里面去
      oddNumsPos.push(right);
    }
  }
  // 窗口滑到了最后，但是仍然满足条件
  if (windowK === k) {
    let right = nums.length - 1;
    // 第一个奇数出现的位置
    const leftPos = oddNumsPos[0];
    // 第K个奇数出现的位置
    const rightPos = oddNumsPos[oddNumsPos.length - 1];
    const leftLength = leftPos - left;
    const rightLength = right - rightPos;
    // 本次方案数
    const totalPlan = leftLength * rightLength + leftLength + rightLength + 1;
    // console.log(nums.slice(left, right + 1));
    total += totalPlan;
    // 找到第一个奇数以后的位置，滑动到这个位置
    left = oddNumsPos[0] + 1;
    // 丢弃老一些的奇数位置
    oddNumsPos.shift();
    // 添加新一些的奇数位置到窗口里面去
    oddNumsPos.push(right);
  }
  return total;
}
