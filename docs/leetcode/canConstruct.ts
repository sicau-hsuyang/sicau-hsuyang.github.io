/**
 * 凡是偶数次的单词都带一个单的，如果最终组合出来的回文串的个数小于K的话，则是可能的，否则是不可能的
 * @param s
 * @param k
 */
export function canConstruct(s: string, k: number): boolean {
  // 拆成每个都至少一个，都不够
  if (s.length < k) {
    return false;
  }
  const cntMap: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    const cnt = cntMap.get(s[i]) || 0;
    if (cnt === 0) {
      cntMap.set(s[i], 1);
    } else {
      cntMap.set(s[i], cnt + 1);
    }
  }
  // 计算每个出现频率的字母的映射
  const digitMap: Map<number, Set<string>> = new Map();
  cntMap.forEach((value, key) => {
    const set = digitMap.get(value) || new Set();
    set.add(key);
    digitMap.set(value, set);
  });
  let oddCnt = 0;
  let eventCnt = 0;
  digitMap.forEach((set, cnt) => {
    if (cnt % 2 === 0) {
      eventCnt += set.size;
    } else {
      oddCnt += set.size;
    }
  });
  // 如果偶数个数的字符多，先消灭所有的奇数的单词
  return oddCnt <= k;
}
