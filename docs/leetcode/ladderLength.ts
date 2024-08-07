interface Struct {
  distance: number;
  word: string;
}

export function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const set: Set<string> = new Set(wordList);
  // endWord不在最后的一个列表中
  if (!set.has(endWord)) {
    return 0;
  }
  let minDistance = Infinity;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const usedSet = new Set();
  usedSet.add(beginWord);
  const queue: Struct[] = [
    {
      distance: 1,
      word: beginWord,
    },
  ];
  while (queue.length) {
    const node = queue.shift()!;
    const { distance, word } = node;
    if (word === endWord && distance < minDistance) {
      minDistance = distance;
    }
    for (let i = 0; i < word.length; i++) {
      for (let k = 0; k < 26; k++) {
        const nextWord = word.slice(0, i) + alphabet[k] + word.slice(i + 1);
        // 不在字典里面的跳过
        if (!set.has(nextWord)) {
          continue;
        }
        // 不要把最后的单词的列表断绝了，因为有存在多种可能的，需要去找到更短的转换序列
        if (
          !usedSet.has(nextWord) ||
          (nextWord === endWord && distance + 1 < minDistance)
        ) {
          queue.push({
            distance: distance + 1,
            word: nextWord,
          });
          usedSet.add(nextWord);
        }
      }
    }
  }
  return minDistance === Infinity ? 0 : minDistance;
}
