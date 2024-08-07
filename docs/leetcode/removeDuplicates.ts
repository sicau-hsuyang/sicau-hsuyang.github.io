export function removeDuplicates(s: string, k: number): string {
  const stack: string[] = [];
  let prevSubStr = "";
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === prevSubStr[0]) {
      prevSubStr += char;
      if (prevSubStr.length === k) {
        if (stack.length) {
          prevSubStr = stack.pop()!;
        } else {
          prevSubStr = "";
        }
      }
    } else {
      if (prevSubStr != "") {
        stack.push(prevSubStr);
      }
      prevSubStr = char;
    }
  }
  if (prevSubStr) {
    stack.push(prevSubStr);
    prevSubStr = "";
  }
  return stack.join("");
}
