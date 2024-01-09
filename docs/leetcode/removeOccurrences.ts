export function removeOccurrences(s: string, part: string): string {
  let str = s;
  while (true) {
    const regExp = new RegExp(part);
    let originalLen = str.length;
    str = str.replace(regExp, "");
    if (originalLen === str.length) {
      break;
    }
  }
  return str;
}
