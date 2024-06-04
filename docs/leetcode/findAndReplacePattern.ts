function isMatchPattern(word: string, pattern: string): boolean {
  const leftToRight: Map<string, string> = new Map();
  const rightToLeft: Map<string, string> = new Map();
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const targetChar = pattern[i];
    const existChar = leftToRight.get(char);
    // 关系存在，必须是对应从左到右的对应
    if (existChar && existChar !== targetChar) {
      return false;
    }
    // 关系不存在，如果从右边校验过来，能够反向映射到左边
    else if (!existChar) {
      const leftChar = rightToLeft.get(targetChar);
      if (leftChar && leftChar !== char) {
        return false;
      }
    }
    // 设置从左边到右边的映射
    leftToRight.set(char, targetChar);
    // 设置从右边到左边的映射
    rightToLeft.set(targetChar, char);
  }
  return true;
}

export function findAndReplacePattern(
  words: string[],
  pattern: string
): string[] {
  return words.filter((word) => isMatchPattern(word, pattern));
}
