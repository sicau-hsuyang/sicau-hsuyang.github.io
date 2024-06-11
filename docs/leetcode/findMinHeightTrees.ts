function calcHeight(num: number,  refMap: number[]) {
  
}

export function findMinHeightTrees(n: number, edges: number[][]): number[] {
  const refMap: Map<number, number[]> = new Map();
  for (let i = 0; i < n; i++) {
    refMap.set(i, []);
  }
  edges.forEach((edge) => {
    const [a, b] = edge;
    const childrenA = refMap.get(a)!;
    const childrenB = refMap.get(b)!;
    childrenA.push(b);
    childrenB.push(a);
  });
  const heightMap: Map<number, number> = new Map();

  return [];
}
