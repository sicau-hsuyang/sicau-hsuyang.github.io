export function reversePrefix(word: string, ch: string): string {
  const idx = word.indexOf(ch);
  if (idx < 0) {
    return word;
  }
  let res = "";
  const remainStr = word.substring(idx + 1);
  for (let i = idx; i >= 0; i--) {
    res += word[i];
  }
  return res + remainStr;
}
