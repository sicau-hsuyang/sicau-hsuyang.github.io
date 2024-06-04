interface NumNode {
  /**
   * 出度
   */
  out: NeighborNode[];
}

interface NeighborNode {
  /**
   * 权重
   */
  weight: number;
  /**
   * 邻接节点的编号
   */
  node: string;
}

export function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  const map: Map<string, NumNode> = new Map();
  for (let i = 0; i < equations.length; i++) {
    const cost = values[i];
    let [fromCode, endCode] = equations[i];
    let fromNode = map.get(fromCode);
    let endNode = map.get(endCode);
    if (!fromNode) {
      fromNode = {
        out: [],
      };
      map.set(fromCode, fromNode);
    }
    if (!endNode) {
      endNode = {
        out: [],
      };
      map.set(endCode, endNode);
    }
    fromNode.out.push({
      weight: cost,
      node: endCode,
    });
    endNode.out.push({
      weight: 1 / cost,
      node: fromCode,
    });
  }
  return queries.map((q) => {
    const [from, to] = q;
    return calcPath(from, to, map);
  });
}

function calcPath(from: string, to: string, map: Map<string, NumNode>) {
  // 如果开始节点和结束节点都不在这个关系集合里面
  if (!map.get(from) || !map.get(to)) {
    return -1;
  }
  // 原地相除
  if (from === to) {
    return 1;
  }
  const set: Set<string> = new Set();
  const ref: Map<string, { code: string; cost: number }> = new Map();
  set.add(from);
  const queue: string[] = [from];
  let found = false;
  while (queue.length) {
    const node = queue.shift()!;
    const nextNode = map.get(node);
    nextNode?.out.forEach((next) => {
      if (!set.has(next.node)) {
        ref.set(next.node, { code: node, cost: next.weight });
        queue.push(next.node);
        set.add(next.node);
      }
    });
    if (to === node) {
      found = true;
      break;
    }
  }
  if (!found) {
    return -1;
  }
  let val = 1;
  let dist = to;
  let tempNode = ref.get(dist);
  while (tempNode) {
    val *= tempNode.cost;
    dist = tempNode.code;
    tempNode = ref.get(dist);
  }
  return val;
}
