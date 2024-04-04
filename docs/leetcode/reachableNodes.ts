export function reachableNodes(
  n: number,
  edges: number[][],
  restricted: number[]
): number {
  /**
   * 边关系的引用
   */
  const map: Map<number, number[]> = new Map();
  edges.forEach((edg) => {
    const [from, to] = edg;
    const nextSiblings = map.get(from) || [];
    nextSiblings.push(to);
    if (nextSiblings.length === 0) {
      map.set(from, nextSiblings);
    }
  });
  const queue: number[] = [0];
  while(queue.length) {
    const num = queue.shift();
    
  }
}
