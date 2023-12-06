export function arrayRankTransform(arr: number[]): number[] {
  const map: Map<number, number> = new Map();
  const sortedNum = arr.slice(0).sort((a, b) => {
    return a - b;
  });
  let offset = 0;
  for (let i = 0; i < sortedNum.length; i++) {
    const num = sortedNum[i];
    if (!map.has(num)) {
      map.set(num, i + 1 - offset);
    } else {
      offset++;
    }
  }
  return arr.map((num) => {
    return map.get(num)!;
  });
}
