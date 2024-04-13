export function findChampion(n: number, edges: number[][]): number {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  edges.forEach((edge) => {
    const [from, to] = edge;
    arr[to] = -1;
  });
  const roots = arr.filter((v) => v !== -1);
  return roots.length === 1 ? roots[0] : -1;
}
