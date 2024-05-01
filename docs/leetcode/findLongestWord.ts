export function findLongestWord(s: string, dictionary: string[]) {
  // 按照字典的长度进行排序
  dictionary.sort((a, b) => {
    if (a.length !== b.length) {
      return b.length - a.length;
    } else {
      let i = 0;
      while (i < a.length) {
        if (a[i] != b[i]) {
          return a[i].charCodeAt(0) - b[i].charCodeAt(0);
        }
      }
      return 0;
    }
  });
  // 用一个哈希表来存当前单词的每个字符所在的位置
  const map: Map<string, number[]> = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const dict = map.get(char) || [];
    if (dict.length === 0) {
      map.set(char, dict);
    }
    dict.push(i);
  }
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    for (let j = 0; j < word.length; j++) {
      const char = word[j];
      // 有的字符没有在
      if (!map.has(char)) {
        break;
      }
    }
  }
  return "";
}
