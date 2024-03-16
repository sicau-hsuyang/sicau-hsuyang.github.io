export function shortestCompletingWord(
  licensePlate: string,
  words: string[]
): string {
  licensePlate = licensePlate.toLowerCase();
  const map: Map<string, number> = new Map();
  for (let i = 0; i < licensePlate.length; i++) {
    const char = licensePlate[i];
    if (!/[a-z]/i.test(char)) {
      continue;
    }
    const size = map.get(char) || 0;
    if (size > 0) {
      map.set(char, size + 1);
    } else {
      map.set(char, 1);
    }
  }
  let maxWord: string = "";
  let maxCounter = 0;
  words.forEach((word) => {
    word = word.toLowerCase();
    let currentCounter = 0;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const times = map.get(char);
      if (times) {
        currentCounter += 1;
      }
    }
    currentCounter = currentCounter / word.length;
    if (maxCounter < currentCounter) {
      maxCounter = currentCounter;
      maxWord = word;
    }
  });
  return maxWord;
}
