interface GraphNode {
  input: number[];
  output: number[];
}

export function findJudge(n: number, trust: number[][]): number {
  const map: Map<number, GraphNode> = new Map();
  for (let i = 0; i < n; i++) {
    map.set(i + 1, {
      input: [],
      output: [],
    });
  }
  for (let i = 0; i < trust.length; i++) {
    const [one, other] = trust[i];
    const myNode = map.get(one);
    const otherNode = map.get(other);
    myNode?.output.push(other);
    otherNode?.input.push(one);
  }
  let judgeKey!: number;
  let counter = 0;
  map.forEach((val, key) => {
    if (val.output.length === 0) {
      judgeKey = key;
      counter++;
    }
  });
  if (counter != 1) {
    return -1;
  } else {
    return map.get(judgeKey)?.input.length === n - 1 ? judgeKey : -1;
  }
}
