export function minAddToMakeValid(s: string): number {
  let total = 0;
  const stack: string[] = [];
  let offset = 0;
  while (offset < s.length) {
    const char = s[offset];
    if (char === ")") {
      let size = stack.length;
      // 直接摆平是最简单有效的办法，否则一会儿会越理越乱
      if (!(size && stack[size - 1] === "(")) {
        total++;
      }
      stack.pop();
    } else {
      stack.push(char);
    }
    offset++;
  }

  total += stack.length;
  return total;
}
