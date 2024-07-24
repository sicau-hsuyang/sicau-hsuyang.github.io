/**
 * 检验一个字符串是否是有效的括号字符串
 * @param s
 */
function checkValid(s: string, start: number, end: number) {
  let stack: string[] = [];
  let offset = start;
  while (offset <= end) {
    const char = s[offset++];
    if (char === ")") {
      // 栈空，或者栈顶元素不是(
      if (!stack.length || stack[stack.length - 1] !== "(") {
        return false;
      }
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  const res = stack.length === 0;
  // if (res) {
  //   console.log(s);
  // }
  return res;
}

function check(
  s: string,
  start = 0,
  end = 0,
  map: Map<string, boolean> = new Map()
) {
  if (map.has(s)) {
    return map.get(s)!;
  }
  for (let i = start; i <= end; i++) {
    if (s[i] === "*") {
      let left = s.slice(start, i);
      let right = s.slice(i + 1, end + 1);
      if (
        checkValid(left + ")", 0, left.length) &&
        checkValidString(right, i + 1, end, map)
      ) {
        return true;
      }
      if (
        checkValid(left, 0, left.length - 1) &&
        checkValidString("(" + right, i + 1, end, map)
      ) {
        return true;
      }
      if (
        !checkValid(left) &&
        !checkValid(right) &&
        checkValidString(left + right, start, end, map)
      ) {
        return true;
      }
    }
  }
  const isValid = checkValid(s);
  map.set(s, isValid);
  return isValid;
}

/**
 * 校验
 * @param s
 * @param offset
 * @param map
 * @returns
 */
export function checkValidString(
  s: string,
  start = 0,
  end = 0,
  map: Map<string, boolean> = new Map()
): boolean {
  if (map.has(s)) {
    return map.get(s)!;
  }
  for (let i = start; i <= end; i++) {
    if (s[i] === "*") {
      let left = s.slice(start, i);
      let right = s.slice(i + 1, end + 1);
      if (checkValid(left + ")") && checkValidString(right, offset + 1, map)) {
        return true;
      }
      if (checkValid(left) && checkValidString("(" + right, offset + 1, map)) {
        return true;
      }
      if (
        !checkValid(left) &&
        !checkValid(right) &&
        checkValidString(left + right, offset + 1, map)
      ) {
        return true;
      }
    }
  }
  const isValid = checkValid(s);
  map.set(s, isValid);
  return isValid;
}
