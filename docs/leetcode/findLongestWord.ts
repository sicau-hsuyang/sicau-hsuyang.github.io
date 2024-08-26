export function findLongestWord(s: string, dictionary: string[]): string {
  dictionary.sort((a, b) => {
    return b.length - a.length;
  });
  let maxDistance = 0;
  let maxLongWord = "";
  for (let i = 0; i < dictionary.length; i++) {
    let strOffset = 0;
    let wordOffset = 0;
    const word = dictionary[i];
    let n = word.length
    if (maxDistance > n) {
      break;
    }
    while (strOffset < s.length) {
      if (word[wordOffset] === s[strOffset]) {
        wordOffset++;
        strOffset++;
      } else {
        strOffset++;
      }
    }
    if (wordOffset < n) {
      continue;
    }
    if (maxDistance < n) {
      maxDistance = n;
      maxLongWord = word;
    } else if (maxDistance === n) {
      let k = 0;
      while (maxLongWord[k] === word[k] && k < n) {
        k++;
      }
      if (maxLongWord.charCodeAt(k) > word.charCodeAt(k)) {
        maxLongWord = word;
      }
    }
  }
  return maxLongWord;
}
