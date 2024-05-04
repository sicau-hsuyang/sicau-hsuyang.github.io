/**
 * 求Map里面的每个键值对是否都大于K
 * @param map
 * @param k
 * @returns
 */
function compareMap(map: Map<string, number>, k: number) {
  for (const value of map.values()) {
    if (value < k) {
      return false;
    }
  }
  return true;
}

/**
 * 找到最小的位置
 * @param posMap
 * @returns
 */
function findMinPos(posMap: Map<string, number>) {
  return Math.min(...posMap.values());
}

export function longestSubstring(s: string, k: number): number {
  let maxDistance = 0;
  const max = Math.ceil(s.length / k);
  // const DK = 4;
  for (let DK = 1; DK <= max; DK++) {
    const windowMap: Map<string, number> = new Map();
    // 用于记录最后一个索引的位置
    const posMap: Map<string, number> = new Map();
    let left = 0;
    let len = s.length;
    for (let right = 0; right < len; right++) {
      const char = s[right];
      // 直接用最新的位置替换掉老的位置，没有的话直接加
      posMap.set(char, right);
      // 如果现在窗口里面已经有DK个字符种类了，并且窗口内没有这个字符
      if (windowMap.size == DK && !windowMap.has(char)) {
        const isBigThanKAll = compareMap(windowMap, k);
        // 如果确实每个记录都大于了K，那么就可以试着求一下最长的解了
        const D = right - left;
        if (isBigThanKAll && D > maxDistance) {
          // console.log(s.substring(left, right));
          maxDistance = D;
        }
        // 然后要丢一些字符，进行下一轮判定
        // 从left的位置开始丢，一直要丢到包含一个完整字母的最小值的位置的下一位，这样保证丢掉的内容是最小的，不会丢弃过多导致错误
        const lastRemovePos = findMinPos(posMap);
        for (let offset = left; offset <= lastRemovePos; offset++) {
          const otherChar = s[offset];
          const tempCount = windowMap.get(otherChar)!;
          if (tempCount === 1) {
            windowMap.delete(otherChar);
            posMap.delete(otherChar);
          } else {
            windowMap.set(otherChar, tempCount - 1);
          }
        }
        left = lastRemovePos + 1;
        // 把新的字符加入到窗口里面去
        windowMap.set(char, 1);
        posMap.set(char, right);
      }
      // 否则，直接加入到窗口的map里面去
      else {
        const count = windowMap.get(char) || 0;
        if (count === 0) {
          windowMap.set(char, 1);
        } else {
          windowMap.set(char, count + 1);
        }
      }
    }
    // 尝试一下最后一个可能性, 最后一个字符一定是要在窗口内，才有这种可能性的
    if (windowMap.size === DK && windowMap.has(s[len - 1])) {
      const isBigThanKAll = compareMap(windowMap, k);
      // 如果确实每个记录都大于了K，那么就可以试着求一下最长的解了
      const D = len - left;
      if (isBigThanKAll && D > maxDistance) {
        // console.log(s.substring(left, len));
        maxDistance = D;
      }
    }
  }
  return maxDistance;
}
