export function validPalindrome(s: string): boolean {
  let res = test1(s, true);
  if (!res) {
    res = test1(s, false);
  }
  return !!res;
}

/**
 * 尝试比较
 * @param s 源字符串
 * @param skipLeft 从左边开始跳
 * @returns
 */
function test1(s: string, skipLeft: boolean) {
  let start = 0;
  let end = s.length - 1;
  // 是否已经跳过1一次了
  let isDel = false;
  while (start <= end) {
    const l = s[start];
    const r = s[end];
    if (l === r) {
      start++;
      end--;
    } else if (
      !isDel &&
      skipLeft &&
      s[start] != s[end] &&
      s[start + 1] === s[end] &&
      start + 1 <= end
    ) {
      console.log("从左边跳过1次");
      isDel = true;
      start = start + 2;
      end--;
    } else if (
      !isDel &&
      !skipLeft &&
      s[start] != s[end] &&
      s[start] === s[end - 1] &&
      start <= end - 1
    ) {
      console.log("从右边跳过1次");
      isDel = true;
      start++;
      end = end - 2;
    } else {
      return false;
    }
  }
  return true;
}
