function isValidParentheses(s: string, map = new Map()): boolean {
  if (map.has(s)) {
    return map.get(s);
  }
  const stack: string[] = [];
  let offset = 0;
  while (offset < s.length) {
    const char = s[offset++];
    if (/[a-z]/.test(char)) {
      continue;
    } else if (char === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        stack.pop();
      }
      if (!stack.length) {
        return false;
      } else {
        // 丢掉顶部的那个(
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }
  const flag = stack.length === 0;
  map.set(s, flag);
  return flag;
}

const globalMap = new Map();

export function removeInvalidParentheses(
  s: string,
  map: Map<string, string[]> = new Map()
): string[] {
  if (map.has(s)) {
    return map.get(s)!;
  }
  const res: Set<string> = new Set();
  let maxLength = -Infinity;
  const isMaxValid = isValidParentheses(s);
  if (isMaxValid) {
    map.set(s, [s]);
    return [s];
  }
  for (let i = 0; i < s.length; i++) {
    if (/[a-z]/.test(s[i])) {
      continue;
    }
    const left = s.slice(0, i);
    const right = s.slice(i + 1);
    const newStr = left + right;
    const isValid = isValidParentheses(newStr, globalMap);
    if (isValid) {
      if (newStr.length > maxLength) {
        maxLength = newStr.length;
        res.clear();
        res.add(newStr);
      } else if (newStr.length === maxLength) {
        res.add(newStr);
      }
    } else {
      const subResults = removeInvalidParentheses(newStr, map);
      subResults.forEach((str) => {
        if (str.length > maxLength) {
          maxLength = str.length;
          res.clear();
          res.add(str);
        } else if (str.length == maxLength) {
          res.add(str);
        }
      });
    }
  }
  const out = [...res.values()];
  map.set(s, out);
  return out;
}
