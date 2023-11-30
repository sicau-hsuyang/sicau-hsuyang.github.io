export function topKFrequent(words: string[], k: number): string[] {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const size = map.get(word) || 0;
    if (size) {
      map.set(word, size + 1);
    } else {
      map.set(word, 1);
    }
  }
  const records = [...map.entries()];
  for (let i = 0; i < records.length; i++) {
    for (let j = records.length - 1; j > i; j--) {
      if (
        records[j][1] > records[j - 1][1] ||
        (records[j][1] === records[j - 1][1] &&
          compare(records[j][0], records[j - 1][0]))
      ) {
        let temp = records[j];
        records[j] = records[j - 1];
        records[j - 1] = temp;
      }
    }
  }
  return records.slice(0, k).map((v) => v[0]);
}

/**
 * 比较两个单词的字典序
 * @param word1
 * @param word2
 * @returns
 */
function compare(word1: string, word2: string) {
  let offset = 0;
  while (word1[offset] && word2[offset]) {
    const code1 = word1.charCodeAt(offset);
    const code2 = word2.charCodeAt(offset);
    if (code1 != code2) {
      return code1 < code2;
    }
    offset++;
  }
  return word1.length < word2.length;
}
