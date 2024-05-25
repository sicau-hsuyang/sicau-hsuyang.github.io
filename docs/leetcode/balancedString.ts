function isBalance(map: Map<string, number>) {
  return [...map.values()].every((v) => v <= 0);
}

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
  const collection: Map<string, number> = new Map();
  for (let i = 0; i < dict.length; i++) {
    // 获取每个字符的数量
    const charCount = map.get(dict[i]) || 0;
    // 如果大于了平衡阈值，说明这个字符串是多了的，就要把它替换掉
    if (charCount > balanceLevel) {
      const val = charCount - balanceLevel;
      collection.set(dict[i], val);
    }
  }
  // 转化问题：即，求包含这么多个目标字符的最短字符串
  // 如果刚好字符串就是平衡的，那就万事大吉了
  const balance = isBalance(collection);
  // 如果已经平衡了，提前结束
  if (balance) {
    return 0;
  }
  let minDistance = Number.MAX_VALUE;
  let left = 0;
  for (let right = 0; right < len; right++) {
    let char = s[right];
    // 可以消费掉的字符
    if (collection.has(char)) {
      const count = collection.get(char)!;
      collection.set(char, count - 1);
    }
    // 如果此刻刚好已经把所有的目标字符都消费完了的话
    while (isBalance(collection)) {
      // 计算距离
      let D = right - left + 1;
      if (D < minDistance) {
        console.log(s.substring(left, right + 1));
        minDistance = D;
      }
      // 前移left指针，怎么做？
      const removeChar = s[left];
      // 如果命中了的话
      if (collection.has(removeChar)) {
        // 补上去
        // collection[removeChar]++;
        const count = collection.get(removeChar)!;
        collection.set(char, count + 1);
      }
      left++;
    }
  }
  return minDistance;
}

/**
 * 2347
 * QQWWWEEEERRRRRRR
 */
