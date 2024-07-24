export function findLadders(
  beginWord: string,
  endWord: string,
  wordList: string[]
): string[] {
  const wordSet: Set<string> = new Set();
  wordList.forEach((word) => {
    wordSet.add(word);
  });
  // 不存在
  if (!wordSet.has(endWord)) {
    return [];
  }
  const charIndexes = "abcdefghijklmnopqrstuvwxyz";
  const queue: string[] = [beginWord];
  const usedSet: Set<string> = new Set();
  usedSet.add(beginWord);
  const refMap: Map<string, string> = new Map();
  let foundSequence = false;
  while (queue.length) {
    const curWord = queue.shift()!;
    if (curWord === endWord) {
      foundSequence = true;
      break;
    }
    const nextSet: Set<string> = new Set();
    for (let i = 0; i < curWord.length; i++) {
      for (let j = 0; j < charIndexes.length; j++) {
        const newWord =
          curWord.slice(0, i) + charIndexes[j] + curWord.slice(i + 1);
        // console.log(newWord);
        // if (wordSet.has(newWord)) {
        //   console.log(newWord);
        // }
        if (wordSet.has(newWord) && !usedSet.has(newWord)) {
          nextSet.add(newWord);
          usedSet.add(newWord);
          refMap.set(newWord, curWord);
        }
      }
    }
    nextSet.forEach((word) => {
      queue.push(word);
    });
  }
  if (!foundSequence) {
    return [];
  }
  const results: string[] = [];
  let parent: string | undefined = endWord;
  while (parent) {
    results.unshift(parent);
    parent = refMap.get(parent);
  }
  return results;
}
