export function maxNumberOfBalloons(text: string): number {
  const charMapping = [0, 0, 0, 0, 0];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === "b") {
      charMapping[0]++;
    } else if (char === "a") {
      charMapping[1]++;
    } else if (char === "l") {
      charMapping[2]++;
    } else if (char === "o") {
      charMapping[3]++;
    } else if (char === "n") {
      charMapping[4]++;
    }
  }
  charMapping[2] = Math.floor(charMapping[2] / 2);
  charMapping[3] = Math.floor(charMapping[3] / 2);
  return Math.min(...charMapping);
}
