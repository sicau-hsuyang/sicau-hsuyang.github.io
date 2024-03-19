export function mergeSimilarItems(
  items1: number[][],
  items2: number[][]
): number[][] {
  const map: Map<number, number> = new Map();
  items2.forEach((v) => {
    map.set(v[0], v[1]);
  });
  const results: Array<[number, number]> = [];
  items1.forEach((v) => {
    const [value, weight] = v;
    if (map.has(value)) {
      results.push([value, weight + map.get(value)!]);
      map.delete(value);
    } else {
      results.push([value, weight]);
    }
  });
  map.forEach((weight, value) => {
    results.push([value, weight]);
  });
  results.sort((a, b) => {
    return a[0] - b[0];
  });
  return results;
}
