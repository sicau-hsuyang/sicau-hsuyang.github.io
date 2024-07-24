function partitionWord(
  s: string,
  offset: number,
  wordDict: Set<string>,
  map: Map<number, string[]>
): string[] {
  if (offset >= s.length) {
    return [];
  }
  if (map.has(offset)) {
    return map.get(offset);
  }
  const res: string[] = [];
  // 单词的长度从1-10
  for (let i = 1; i <= 10 && offset + i <= s.length; i++) {
    let nextLen = offset + i;
    let word = s.substring(offset, nextLen);
    if (wordDict.has(word)) {
      if (nextLen === s.length) {
        res.push(word);
      } else {
        const nextResult = partitionWord(s, nextLen, wordDict, map);
        // 设置记忆条件
        map.set(nextLen, nextResult);
        nextResult.forEach((result) => {
          if (result.length) {
            res.push(word + " " + result);
          }
        });
      }
    }
  }
  return res;
}

export function wordBreak(s: string, wordDict: string[]): string[] {
  const dictSet: Set<string> = new Set();
  // 将数组转成哈希
  for (let i = 0; i < wordDict.length; i++) {
    dictSet.add(wordDict[i]);
  }
  const res = partitionWord(s, 0, dictSet, new Map());
  // console.log(res);
  return res;
}
