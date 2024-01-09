export function findAndReplacePattern(
  words: string[],
  pattern: string
): string[] {
  const result: string[] = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length !== pattern.length) {
      continue;
    }
    const map: Map<string, string> = new Map();
    const reverseMap: Map<string, string> = new Map();
    let flag = true;
    for (let k = 0; k < word.length; k++) {
      const char = word[k];
      const patternChar = map.get(char);
      // 不存在，且没有被用过
      if (!patternChar && !reverseMap.has(pattern[k])) {
        map.set(char, pattern[k]);
        reverseMap.set(pattern[k], char);
      } else {
        flag = false;
        break;
      }
    }
    if (flag) {
      result.push(word);
    }
  }
  return result;
}
