export function arrangeWords(text: string): string {
  const tempArr = text
    .split(" ")
    .filter((v) => v.length > 0)
    .map((v, idx) => {
      return {
        word: v.toLocaleLowerCase(),
        pos: idx,
      };
    });
  tempArr.sort((a, b) => {
    if (a.word.length !== b.word.length) {
      return a.word.length - b.word.length;
    } else {
      return a.pos - b.pos;
    }
  });
  const dist = tempArr.map((v) => v.word).join(" ");
  return dist[0].toLocaleUpperCase() + dist.substring(1);
}
