export function hIndex(citations: number[]): number {
  const bucket: number[] = Array.from({
    length: 1001,
  }).fill(0) as number[];
  for (let i = 0; i < citations.length; i++) {
    const refCount = citations[i];
    bucket[refCount]++;
  }
  let total = 0;
  let index = 0;
  for (let i = bucket.length - 1; i > 0; i--) {
    total += bucket[i];
    if (total >= i) {
      index = i;
      break;
    }
  }
  return index;
}


