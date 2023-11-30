export function wordPattern(pattern: string, s: string): boolean {
  const map: Map<string, string> = new Map();
  const wordMap: Map<string, string> = new Map();
  const words = s.split(/\s/);
  if(words.length !== pattern.length) {
    return false
  }
  for (let i = 0; i < words.length; i++) {
    const char = pattern[i];
    // 正推，反推
    if (
      map.has(char) &&
      (map.get(char) !== words[i] || wordMap.get(words[i]) !== char)
    ) {
      return false;
    } else {
      // 如果单词已经被用过了
      if (wordMap.has(words[i]) && wordMap.get(words[i]) !== char) {
        return false;
      }
      map.set(char, words[i]);
      wordMap.set(words[i], char);
    }
  }
  return true;
}
