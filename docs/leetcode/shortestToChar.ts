export function shortestToChar(s: string, c: string): number[] {
  const res: number[] = [];
  for (let k = 0; k < s.length; k++) {
    const char = s[k];
    // 如果当前直接就是特征字母，那肯定不是预期的值
    if (char === c) {
      res[k] = 0;
    } else {
      let left = k - 1;
      let right = k + 1;
      // 左边的距离
      let leftDistance = Infinity;
      let rightDistance = Infinity;
      // 向左查找
      while (left >= 0) {
        if (s[left] === c) {
          leftDistance = k - left;
          break;
        }
        left--;
      }
      // 向右查找
      while (right < s.length) {
        if (s[right] === c) {
          rightDistance = right - k;
          break;
        }
        right++;
      }
      // 从两个值里面取出一个较小的值
      res[k] = Math.min(leftDistance, rightDistance);
    }
  }
  return res;
}
