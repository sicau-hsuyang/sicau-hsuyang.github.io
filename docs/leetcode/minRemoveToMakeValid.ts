export function minRemoveToMakeValid(s: string): string {
  const removeRecord: Set<number> = new Set();
  const stack: Array<{ pos: number; char: string }> = [];
  let offset = 0;
  while (offset < s.length) {
    let char = s[offset];
    if (char === "(") {
      stack.push({
        pos: offset,
        char,
      });
    } else if (char === ")") {
      if (stack.length && stack[stack.length - 1].char === "(") {
        stack.pop();
      } else {
        removeRecord.add(offset);
      }
    }
    offset++;
  }
  while (stack.length) {
    const { pos } = stack.shift()!;
    removeRecord.add(pos);
  }
  let res = "";
  for (let i = 0; i < s.length; i++) {
    if (removeRecord.has(i)) {
      continue;
    }
    res += s[i];
  }
  return res;
}


