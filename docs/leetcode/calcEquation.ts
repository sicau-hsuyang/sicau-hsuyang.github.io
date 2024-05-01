interface Edge {
  from: string;
  to: string;
  cost: number;
}

export function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  const inputMap: Map<string, Edge[]> = new Map();
  const outputMap: Map<string, Edge[]> = new Map();
  equations.forEach((eq, idx) => {
    const [from, to] = eq;
    const outputEdge: Edge = {
      from,
      to,
      cost: values[idx],
    };
    const inputEdge: Edge = {
      from: to,
      to: from,
      cost: 1 / values[idx],
    };
    const outputEdges = outputMap.get(from) || [];
    if (outputEdges.length === 0) {
      outputMap.set(from, outputEdges);
    }
    outputEdges.push(outputEdge);
    const inputEdges = inputMap.get(to) || [];
    if (inputEdges.length === 0) {
      inputMap.set(to, inputEdges);
    }
    inputEdges.push(inputEdge);
  });
  const results: number[] = Array.from({
    length: queries.length,
  }).fill(-1.0) as number[];
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    const [from, to] = q;
    const inputEdges = inputMap.get(from) || [];
    const outputEdges = outputMap.get(from) || [];
    if (from === to) {
      results[i] = inputEdges.length > 0 || outputEdges.length > 0 ? 1 : -1;
      // 自己除以自己
      continue;
    }
    let hasResult = false;
    for (let o = 0; o < outputEdges.length; o++) {
      const edge = outputEdges[o];
      const res = findTarget(edge, outputMap, inputMap, to, edge.cost, false);
      if (res.isExist) {
        results[i] = res.val;
        hasResult = true;
        break;
      }
    }
    if (hasResult) {
      continue;
    }
    for (let k = 0; k < inputEdges.length; k++) {
      const edge = inputEdges[k];
      const res = findTarget(edge, inputMap, outputMap, to, edge.cost, true);
      if (res.isExist) {
        results[i] = res.val;
        break;
      }
    }
  }
  return results;
}

/**
 * 从一个路径查找到指定的某个路径
 * @param e
 * @param accumulate
 * @param isDivide
 */
function findTarget(
  e: Edge,
  edgeInRef: Map<string, Edge[]>,
  edgeOutRef: Map<string, Edge[]>,
  targetName: string,
  accumulate: number,
  isDivide: boolean,
  usedSet: Set<Edge> = new Set()
): { isExist: boolean; val: number } {
  if (usedSet.has(e)) {
    return {
      isExist: false,
      val: -1,
    };
  }
  usedSet.add(e);
  if (e.to === targetName) {
    // const val = isDivide ? accumulate / e.cost : accumulate * e.cost;
    return {
      isExist: true,
      val: accumulate,
    };
  }
  const nextEdges1 = edgeInRef.get(e.to) || [];
  let output: { isExist: boolean; val: number } | null = null;
  for (let i = 0; i < nextEdges1.length; i++) {
    const edge = nextEdges1[i];
    const v = isDivide ? accumulate / edge.cost : accumulate * edge.cost;
    const result = findTarget(
      edge,
      edgeInRef,
      edgeOutRef,
      targetName,
      v,
      isDivide,
      usedSet
    );
    if (result.isExist) {
      output = result;
      break;
    }
  }
  if (output) {
    return output;
  }
  const nextEdges2 = edgeOutRef.get(e.to) || [];
  for (let i = 0; i < nextEdges2.length; i++) {
    const edge = nextEdges2[i];
    const v = isDivide ? accumulate / edge.cost : accumulate * edge.cost;
    const result = findTarget(
      edge,
      edgeInRef,
      edgeOutRef,
      targetName,
      v,
      isDivide,
      usedSet
    );
    if (result.isExist) {
      output = result;
      break;
    }
  }
  if (!output) {
    output = {
      isExist: false,
      val: -1,
    };
  }
  return output;
}
