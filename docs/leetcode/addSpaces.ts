export function addSpaces(s: string, spaces: number[]): string {
  let result = "";
  let offset = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const pos = spaces[offset];
    if (pos === i) {
      result += " " + char;
      offset++;
    } else {
      result += char;
    }
  }
  return result;
}
