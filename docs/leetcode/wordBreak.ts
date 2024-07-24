function _wordBreak(
  s: string,
  offset: number,
  wordDict: Set<string>,
  map: Map<number, boolean>
) {
  if (offset >= s.length) {
    return true;
  }
  if (map.has(offset)) {
    return map.get(offset)!;
  }
  for (let i = 1; i <= 300 && offset + i <= s.length; i++) {
    let len = offset + i;
    // 因为这儿取不到等于，所以上面就可以取到等于
    const word = s.substring(offset, len);
    // 当前位置可以取出来当前单词
    if (wordDict.has(word)) {
      let canBreak = _wordBreak(s, len, wordDict, map);
      map.set(len, canBreak);
      if (canBreak) {
        return true;
      }
    }
  }
  return false;
}

export function wordBreak(s: string, wordDict: string[]): boolean {
  const dictSet: Set<string> = new Set();
  for (let i = 0; i < wordDict.length; i++) {
    dictSet.add(wordDict[i]);
  }
  return _wordBreak(s, 0, dictSet, new Map());
}
