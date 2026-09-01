export function decodeString(s: string): string {
  const stack: string[] = [];
  let res = "";
  for (let i = 0; i < s.length; i++) {
    if (stack.length === 0 && !(/\d/.test(s[i]))) {
      res += s[i];
      continue;
    } else if ("]" === s[i]) {
      let temp = "";
      while (stack.length && stack[stack.length - 1] !== "[") {
        const char = stack.pop();
        temp = char + temp;
      }
      // 弹出 [
      stack.pop();
      // 弹出数字
      let num = "";
      while (stack.length && /\d/.test(stack[stack.length - 1])) {
        const char = stack.pop();
        num = char + num;
      }
      // 拼接重复的
      const digit = Number.parseInt(num);
      const repeatStr = temp.repeat(digit);
      if (stack.length) {
        stack.push(repeatStr);
      } else {
        res += repeatStr;
      }
    } else {
      stack.push(s[i]);
    }
  }
  return res;
}
