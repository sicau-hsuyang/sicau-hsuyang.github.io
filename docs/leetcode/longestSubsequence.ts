export function longestSubsequence(arr: number[], difference: number): number {
  const map: Map<number, number> = new Map();
  let maxDistance = 1;
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const target = num - difference;
    if (map.has(target)) {
      const d = map.get(target)! + 1;
      map.set(num, d);
      maxDistance = Math.max(maxDistance, d);
    } else {
      map.set(num, 1);
    }
  }
  return maxDistance;
}

JSON.stringify(
  Array.from({
    length: 10000,
  }).map(() => {
    return (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 100);
  })
);
