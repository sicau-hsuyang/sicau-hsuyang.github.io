function _minDistance(word1: string, word2: string): number {
  console.log(word1, word2);
  if (word1 === word2) {
    return 0;
  }
  let distance = Number.MAX_VALUE;
  for (let i = 0; i < word1.length; i++) {
    const str = word1.slice(0, i) + word1.slice(i + 1);
    let d = 1 + _minDistance(str, word2);
    if (d < distance) {
      distance = d;
    }
  }
  for (let i = 0; i < word2.length; i++) {
    const str = word2.slice(0, i) + word2.slice(i + 1);
    let d = 1 + _minDistance(word1, str);
    if (d < distance) {
      distance = d;
    }
  }
  return distance;
}

export function minDistance(word1: string, word2: string): number {
  return _minDistance(word1, word2);
}
