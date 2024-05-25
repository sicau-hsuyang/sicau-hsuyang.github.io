function compareDict(m1: Map<number, number>, m2: Set<number>) {
  for (const key of m1.keys()) {
    if (!m2.has(key)) {
      return false;
    }
  }
  return true;
}

export function shortestSeq(big: number[], small: number[]): number[] {
  const shortSet: Set<number> = new Set();
  for (let i = 0; i < small.length; i++) {
    const num = small[i];
    shortSet.add(num);
  }
  let distLeft;
  let distRight;
  let left = -1;
  let minDistance = Number.MAX_VALUE;
  // 包含满足要求数字窗口的哈希表
  const windowMap: Map<number, number> = new Map();
  for (let right = 0; right < big.length; right++) {
    const num = big[right];
    // 如果还没有开启窗口，当前来的数字是短数组里面的了
    if (left === -1 && shortSet.has(num)) {
      left = right;
      const count = windowMap.get(num) || 0;
      // 设置上当前字符的频率
      if (count === 0) {
        windowMap.set(num, 1);
      } else {
        windowMap.set(num, count + 1);
      }
      // 长度相等，并且字典里面的内容都是一样的时候，只有一个字符
      if (windowMap.size === shortSet.size) {
        minDistance = 1;
        distLeft = distRight = right;
        break;
      }
    }
    // 已经开启了窗口
    else if (left !== -1 && shortSet.has(num)) {
      const count = windowMap.get(num) || 0;
      // 设置上当前字符的频率
      if (count === 0) {
        windowMap.set(num, 1);
      } else {
        windowMap.set(num, count + 1);
      }
      // 长度相等，并且字典里面的内容都是一样的时候
      while (
        windowMap.size === shortSet.size &&
        compareDict(windowMap, shortSet)
      ) {
        // 如果当前距离小于已经求出来的最小距离
        const D = right - left + 1;
        if (D < minDistance) {
          distLeft = left;
          distRight = right;
          console.log(big.slice(left, right + 1));
          minDistance = D;
        }
        // 找到第一个在small里面的数字
        const firstExitsNum = big[left];
        const firstNumCount = windowMap.get(firstExitsNum) || 0;
        // 先丢弃窗口中的一个数字
        if (firstNumCount === 1) {
          windowMap.delete(firstExitsNum);
        } else {
          windowMap.set(firstExitsNum, firstNumCount - 1);
        }
        // 先往后靠一个位置，成功丢弃了一个数字
        left++;
        // 一直找到后面的数字是在small数组里面出现过的为止，主要是为了去掉无用的数字
        let tempNum = big[left];
        while (!shortSet.has(tempNum)) {
          left++;
          tempNum = big[left];
        }
      }
    }
  }
  return minDistance === Number.MAX_VALUE ? [] : [distLeft, distRight];
}
