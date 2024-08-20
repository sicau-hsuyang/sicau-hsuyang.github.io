/**
 * 校验
 * @param s
 * @param offset
 * @param map
 * @returns
 */
export function checkValidString(s: string): boolean {
  // 最大右括号数
  let minLeftBracket = 0;
  // 最小右括号数
  let maxLeftBracket = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === "(") {
      maxLeftBracket++;
      minLeftBracket++;
    } else if (char === "*") {
      minLeftBracket--;
      maxLeftBracket++;
    } else {
      minLeftBracket--;
      maxLeftBracket--;
    }
  }
}
