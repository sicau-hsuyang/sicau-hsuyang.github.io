export function isPossible(nums: number[]): boolean {
  // 新开辟的 长度不足3的序列，分别用2个池子来记住它
  const onceSeq = new Map();
  const twiceSeq = new Map();
  const satisfiedSeqMap: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    const digit = nums[i];
    // 优先以digit-1
    let normalSeqCount = satisfiedSeqMap.get(digit - 1) || 0;
    let onceCount = onceSeq.get(digit - 1) || 0;
    let twiceCount = twiceSeq.get(digit - 1) || 0;
    if (twiceCount > 0) {
      // 2->3
      if (twiceCount === 1) {
        twiceSeq.delete(digit - 1);
      } else {
        // 削减
        twiceSeq.set(digit - 1, twiceCount - 1);
      }
      // 增加新的
      const nextCount = satisfiedSeqMap.get(digit) || 0;
      satisfiedSeqMap.set(digit, nextCount + 1);
    } else if (onceCount > 0) {
      // 1->2
      // 削减
      if (onceCount === 1) {
        onceSeq.delete(digit - 1);
      } else {
        onceSeq.set(digit - 1, onceCount - 1);
      }
      // 增加新的
      const nextCount = twiceSeq.get(digit) || 0;
      twiceSeq.set(digit, nextCount + 1);
    }
    // 先从已经OK了的内容里面拿
    else if (normalSeqCount > 0) {
      satisfiedSeqMap.set(digit - 1, normalSeqCount - 1);
      const nextCount = satisfiedSeqMap.get(digit) || 0;
      satisfiedSeqMap.set(digit, nextCount + 1);
    }
    // 开辟一个新的
    else {
      const cnt = onceSeq.get(digit) || 0;
      if (cnt === 0) {
        // 0->1
        onceSeq.set(digit, 1);
      } else {
        onceSeq.set(digit, cnt + 1);
      }
    }
  }
  // 最后验证一下是不是所有的序列都是大于等于3的
  return onceSeq.size === 0 && twiceSeq.size === 0;
}
