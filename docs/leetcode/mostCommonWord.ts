function mostCommonWord(paragraph: string, banned: string[]): string {
  const group = paragraph.split(/[^a-z]+/i);
  const map: Map<string, number> = new Map();
  group.forEach((word) => {
    if (map.has(word)) {
      const val = map.get(word)!;
      map.set(word, val + 1);
    } else {
      map.set(word, 1);
    }
  });
  const result = [...map.entries()]
    .filter((v) => {
      return !banned.includes(v[0]);
    })
    .sort((a, b) => {
      return a[1] - b[1];
    });
  return result[0][0];
}
