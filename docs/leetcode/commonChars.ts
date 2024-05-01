export function commonChars(words: string[]): string[] {
  const map: Map<string, number> = new Map();
  const blackCharSet: Set<string> = new Set();
  words.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const counter = map.get(char) || 0;
      if (counter === 0) {
        map.set(char, 1);
      } else {
        map.set(char, counter + 1);
      }
    }
    // 加入到黑名单里面去
    for (const [key, value] of map) {
      // 曾经出现过，但是现在没有出现过了
      const size = map.get(key) || 0;
      if (word.indexOf(key) < 0 && size > 0) {
        blackCharSet.add(key);
      }
    }
  });
  const results: string[] = [];
  for (const [key, value] of map) {
    if (blackCharSet.has(key)) {
      continue;
    }
    const size = Math.floor(value / words.length);
    for (let i = 0; i < size; i++) {
      results.push(key);
    }
  }
  return results;
}
