export function isPossible(nums: number[]): boolean {
  const dict: Array<{
    num: number;
    count: number;
  }> = [];
  let n = 0;
  let prevVal = nums[n];
  for (let i = 1; i < nums.length; i++) {
    if (prevVal !== nums[i]) {
      dict.push({
        num: prevVal,
        count: i - n,
      });
      prevVal = nums[i];
      n = i;
    }
  }
  dict.push({
    num: prevVal,
    count: nums.length - n,
  });
  // 用来记住最后结尾的数字的长度，因为以后凑不够3的长度的子片段都可以往这个里面塞
  const seqMap: Map<number, number> = new Map();
  const set: Set<string> = new Set();
  while (dict.length) {
    let str = String(dict[0].num);
    // 第一个是肯定存在的，要不然就直接被丢掉了
    let startVal = dict[0].num;
    let prevVal = startVal;
    dict[0].count--;
    let canClear = dict.length >= 3;
    const limit = dict.length;
    for (let i = 1; i < limit; i++) {
      if (dict[i].count === 0 || dict[i].num - prevVal !== 1) {
        canClear = false;
        break;
      } else {
        dict[i].count--;
        prevVal = dict[i].num;
        str += prevVal;
        if (dict[i].count >= 1) {
          canClear = prevVal - startVal + 1 >= 3;
          break;
        }
      }
    }
    // 如果可以消掉的话，
    if (canClear) {
      set.add(str);
      const cnt = seqMap.get(prevVal) || 0;
      if (cnt === 0) {
        seqMap.set(prevVal, 1);
      } else {
        seqMap.set(prevVal, cnt + 1);
      }
    } else {
      // 不能消掉
      const existCnt = seqMap.get(startVal - 1) || 0;
      if (existCnt === 0) {
        return false;
      } else {
        seqMap.set(startVal - 1, existCnt - 1);
        // 让字符串变长，形成新的字符串
        const cnt = seqMap.get(prevVal) || 0;
        if (cnt === 0) {
          seqMap.set(prevVal, 1);
        } else {
          seqMap.set(prevVal, cnt + 1);
        }
      }
    }
    // 丢掉已经用过了的内容
    while (dict.length && dict[0].count === 0) {
      dict.shift();
    }
  }
  return true;
}
