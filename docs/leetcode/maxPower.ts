export function maxPower(s: string): number {
  let max = 0;
  let offset = 0;
  let lastChar = "";
  let distance = 0;
  while (offset < s.length) {
    const char = s[offset++];
    if (lastChar === "") {
      lastChar = char;
      max = 1;
      distance = 1;
      continue;
    }
    if (char === lastChar) {
      distance++;
      if (distance > max) {
        max = distance;
      }
    } else {
      lastChar = char;
      distance = 1;
    }
  }
  return max;
}
