function getDictMap(words1: string[]) {
  const map: Map<string, Map<string, number>> = new Map();
  for (let i = 0; i < words1.length; i++) {
    const word = words1[i];
    const tmpMap: Map<string, number> = new Map();
    for (let j = 0; j < word.length; j++) {
      if (tmpMap.has(word[j])) {
        const cnt = tmpMap.get(word[j])!;
        tmpMap.set(word[j], cnt + 1);
      } else {
        tmpMap.set(word[j], 1);
      }
    }
    map.set(word, tmpMap);
  }
  return map;
}

/**
 * 单词2是否是单词1的子集
 * @param word1
 * @param word2
 * @returns
 */
function isChildSet(word1: Map<string, number>, word2: Map<string, number>) {
  for (const [key, value] of word2) {
    if (!word1.has(key) || word1.get(key)! < value) {
      return false;
    }
  }
  return true;
}

export function wordSubsets(words1: string[], words2: string[]): string[] {
  const map1 = getDictMap(words1);
  const res: string[] = [];
  // 更新每个字符的最大的频率
  const alphabetMap: Map<string, number> = new Map();
  words2.forEach((word) => {
    const record = {};
    for (let i = 0; i < word.length; i++) {
      if (record[word[i]]) {
        record[word[i]]++;
      } else {
        record[word[i]] = 1;
      }
      if (
        !alphabetMap.has(word[i]) ||
        alphabetMap.get(word[i])! < record[word[i]]
      ) {
        // 更新最大次数
        alphabetMap.set(word[i], record[word[i]]);
      }
    }
  });
  for (let i = 0; i < words1.length; i++) {
    if (isChildSet(map1.get(words1[i])!, alphabetMap)) {
      res.push(words1[i]);
    }
  }
  return res;
}
