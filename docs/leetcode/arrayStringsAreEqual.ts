export function arrayStringsAreEqual(
  word1: string[],
  word2: string[]
): boolean {
  const str1 = word1.join("");
  const str2 = word2.join("");
  if (str1.length !== str2.length) {
    return false;
  }
  const map: Map<string, number> = new Map();
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    const size = map.get(char) || 0;
    if (size > 0) {
      map.set(char, size + 1);
    } else {
      map.set(char, 1);
    }
  }
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];
    const size = map.get(char) || 0;
    if (size > 1) {
      map.set(char, size - 1);
    } else if (size === 1) {
      map.delete(char);
    } else {
      return false;
    }
  }
  return map.size === 0;
}
