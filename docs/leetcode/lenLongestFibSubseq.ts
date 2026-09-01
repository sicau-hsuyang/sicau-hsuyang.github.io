export function lenLongestFibSubseq(arr: number[]): number {
  const map: Map<number, Map<number, number>> = new Map();
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let sum = arr[i] + arr[j];
      let sumMap = map.get(sum);
      if (!sumMap) {
        sumMap = new Map();
        map.set(sum, sumMap);
      }
      sumMap.set(arr[j], 2);
    }
  }
  
}
