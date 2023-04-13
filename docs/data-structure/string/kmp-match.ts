/**
 * 生成next数组
 * @param pattern
 * @param next
 */
export function genNext(pattern: string): number[] {
  let m = pattern.length;
  let next: number[] = [];
  // 因为第一个字符串没有前后缀，所以可以直接赋值0，相当于动态规划可直接求得的初始条件
  next[0] = 0;
  //当取一个字符的时候，肯定是一个前后缀都没有的
  for (let i = 1, j = 0; i < m; ++i) {
    // 如果没有匹配到，递归的去求之前的最大前缀
    // 退出循环条件是 k大于0 并且当前位置的字符串要是一样的
    while (j > 0 && pattern[i] !== pattern[j]) {
      // 回溯，找到上一次的最大前后缀的长度
      j = next[j - 1];
    }
    // 如果匹配到了，最大的前后缀+1
    if (pattern[i] == pattern[j]) {
      j++;
    }
    // 求出当前字符串的最大公共前后缀，更新next数组
    next[i] = j;
  }
  return next;
}

/**
 * KMP-Search
 * @param tpl
 * @param pattern
 * @returns
 */
export function kmpMatch(tpl: string, pattern: string): number {
  let n = tpl.length,
    m = pattern.length;
  let pos = -1;
  let next = genNext(pattern);
  for (let i = 0, q = 0; i < n; i++) {
    /* 不断回溯，直到存在最长公共前后缀或回退到0，此处思路和求next数组求解思路一致。 */
    while (q > 0 && pattern[q] != tpl[i]) {
      q = next[q - 1];
    }
    // 如果当前字符和模式字符串指针位上的字符相等, 模式指针后移一位
    if (pattern[q] == tpl[i]) {
      q++;
    }
    /*
     *  上述2个if不能交换位置，必须先判断是否匹配失败，才能继续进行匹配，如果交换的话，q指针先向后移动了一位，当前循环并没有结束，i指针还在前一个位置，此刻出现了错位，那么函数将不会正常运行。
     */
    // 如果模式字符串指针的位置走到了最后一位，则说明匹配成功了
    if (q == m) {
      // 因为当前匹配的位置实际上是在pattern的length-1的位置上
      pos = i - m + 1;
      break;
    }
  }
  return pos;
}
