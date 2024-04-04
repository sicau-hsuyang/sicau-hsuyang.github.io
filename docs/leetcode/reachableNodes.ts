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
    if (nextSiblings.length === 1) {
      map.set(from, nextSiblings);
    }
    const preSiblings = map.get(to) || [];
    preSiblings.push(from);
    // 记录双向边
    if (preSiblings.length === 1) {
      map.set(to, preSiblings);
    }
  });
  const queue: number[] = [0];
  while (queue.length) {
    const num = queue.shift();
  }
}
