/**
 *
 * @param s
 */
export function balancedString(s: string): number {
  const map: Map<string, number> = new Map();
  // 除以4，得到平衡的标准
  let len = s.length;
  const balanceLevel = len / 4;
  for (let i = 0; i < len; i++) {
    const char = s[i];
    const count = map.get(char) || 0;
    if (count === 0) {
      map.set(char, 1);
    } else {
      map.set(char, count + 1);
    }
  }
  const dict = "QWER";
  const collection: Record<string, number> = {
    Q: 0,
    W: 0,
    E: 0,
    R: 0,
  };
  for (let i = 0; i < dict.length; i++) {
    // 获取每个字符的数量
    const charCount = map.get(dict[i]) || 0;
    if (charCount > balanceLevel) {
      const val = charCount - balanceLevel;
      collection[dict[i]] = val;
    }
  }
  // 转化问题：即，求包含这么多个目标字符的最短字符串
  // 如果刚好字符串就是平衡的，那就万事大吉了
  if (
    collection["Q"] === 0 &&
    collection["W"] === 0 &&
    collection["E"] === 0 &&
    collection["R"] === 0
  ) {
    return 0;
  }
  let minDistance = 0;
  let left = 0;
  let emptyCharPos = -1;
  for (let right = 0; right < len; right++) {
    let char = s[right];
    if (collection[char] > 0) {
      collection[char]--;
      // 如果此刻刚好已经把所有的目标字符都消费完了的话
      if (
        collection["Q"] === 0 &&
        collection["W"] === 0 &&
        collection["E"] === 0 &&
        collection["R"] === 0
      ) {
        // 计算距离
        let D = right - left + 1;
        if (D < minDistance) {
          minDistance = D;
        }
      }
    } else if (emptyCharPos === -1) {
      emptyCharPos = right;
    }
  }
  return minDistance;
}

/**
 * 2347
 * QQWWWEEEERRRRRRR
 */
