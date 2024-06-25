export function minWindow(s: string, t: string): string {
  let dist = "";
  let minLength = Number.MAX_VALUE;
  let left = 0;
  // 用来存储删掉的
  const usedMap: Map<string, number> = new Map();
  // 用来存储子串每个字符的长度
  const requireMap: Map<string, number> = new Map();
  // 用来存储整个窗口里面保持的字符内容
  const windowMap: Map<string, number> = new Map();
  for (let i = 0; i < t.length; i++) {
    const size = usedMap.get(t[i]) || 0;
    if (size > 0) {
      usedMap.set(t[i], size + 1);
      requireMap.set(t[i], size + 1);
    } else {
      usedMap.set(t[i], 1);
      requireMap.set(t[i], 1);
    }
  }
  for (let right = 0; right < s.length; right++) {
    const windowCount = windowMap.get(s[right]) || 0;
    // 记录在窗口里面的字符
    if (windowCount === 0) {
      windowMap.set(s[right], 1);
    } else {
      windowMap.set(s[right], windowCount + 1);
    }
    const count = usedMap.get(s[right]) || 0;
    // 多个在子串里面的字符
    if (count > 1) {
      usedMap.set(s[right], count - 1);
    }
    // 一个在子串里面的字符
    else if (count === 1) {
      usedMap.delete(s[right]);
    }
    // 如果已经全部覆盖完
    if (usedMap.size === 0) {
      const distance = right - left + 1;
      // console.log(s.substring(left, right + 1));
      // 更新距离
      if (minLength > distance) {
        minLength = distance;
        dist = s.substring(left, right + 1);
      }
      // 如果left在的位置，是包含子串的，丢弃
      let offset = left;
      let requireSize = requireMap.get(s[offset]) || 0;
      // 一直出掉一个字符，知道窗口里面的字符已经不能完全覆盖子串
      let winSize = windowMap.get(s[offset]) || 0;
      // 出去一个字符串将会导致无法完成最小覆盖，所以在这个循环里面是一定可以继续更新最小的结果的
      while (winSize > requireSize) {
        if (winSize === 1) {
          windowMap.delete(s[offset]);
        } else if (winSize > 1) {
          windowMap.set(s[offset], winSize - 1);
        }
        offset++;
        // 向右走，如果一直可以覆盖的话，就一直删
        requireSize = requireMap.get(s[offset]) || 0;
        winSize = windowMap.get(s[offset]) || 0;
        // 向右走过了，可以使得答案更好，更新答案
        const distance = right - offset + 1;
        // console.log(s.substring(offset, right + 1));
        // 一直更新距离
        if (minLength > distance) {
          minLength = distance;
          dist = s.substring(offset, right + 1);
        }
      }
      // 到这个位置为止，已经是能够覆盖的极限了，一旦再出，就需要考虑了
      if (winSize === 1) {
        windowMap.delete(s[offset]);
      } else if (winSize > 1) {
        windowMap.set(s[offset], winSize - 1);
      }
      usedMap.set(s[offset], 1);
      offset++;
      left = offset;
    }
  }
  return dist;
}
