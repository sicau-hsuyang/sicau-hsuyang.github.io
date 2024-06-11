export function countCompleteComponents(n: number, edges: number[][]): number {
  const map: Map<number, number[]> = new Map();
  for (let i = 0; i < n; i++) {
    map.set(i, []);
  }
  edges.forEach((edge) => {
    const [a, b] = edge;
    let node1Refs = map.get(a)!;
    let node2Refs = map.get(b)!;
    node1Refs.push(b);
    node2Refs.push(a);
  });
  let total = 0;
  const set: Set<number> = new Set();
  for (let i = 0; i < n; i++) {
    if (set.has(i)) {
      continue;
    }
    set.add(i);
    const nextNodes = map.get(i)!;
    // 当前的这个点算作一个单独的联通分量
    if (nextNodes.length === 0) {
      total++;
    } else {
      let flag = true;
      for (let k = 0; k < nextNodes.length; k++) {
        const sibling = nextNodes[k];
        set.add(nextNodes[k]);
        const targetNextNodes = map.get(sibling)!;
        if (targetNextNodes.length !== nextNodes.length) {
          flag = false;
          break;
        }
        // 必须是完全一样的连接关系
        const compareSet1 = new Set();
        for (const o of targetNextNodes) {
          compareSet1.add(o);
        }
        compareSet1.add(nextNodes[k]);
        const compareSet2 = new Set();
        for (const j of nextNodes) {
          compareSet2.add(j);
        }
        compareSet2.add(i);
        for (const v of compareSet1) {
          if (!compareSet2.has(v)) {
            flag = false;
            break;
          }
        }
      }
      if (flag) {
        total++;
      }
    }
  }
  return total;
}
