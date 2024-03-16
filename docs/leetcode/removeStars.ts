export function removeStars(s: string): string {
  let offset = 0;
  const stack: string[] = [];
  while (offset < s.length) {
    const char = s[offset];
    if (char === "*") {
      stack.pop();
    } else {
      stack.push(char);
    }
    offset++;
  }
  return stack.join("");
}
