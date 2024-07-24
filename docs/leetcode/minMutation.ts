interface MutationNode {
  gene: string;
  count: number;
}

export function minMutation(
  startGene: string,
  endGene: string,
  bank: string[]
): number {
  const indexes: Set<string> = new Set();
  for (let i = 0; i < bank.length; i++) {
    const gene = bank[i];
    indexes.add(gene);
  }
  let minDistance = Number.MAX_VALUE;
  const queue: MutationNode[] = [
    {
      gene: startGene,
      count: 0,
    },
  ];
  const GeneIndexes = "AGCT";
  const usedSet = new Set();
  while (queue.length) {
    const { gene: curGen, count } = queue.shift()!;
    if (curGen === endGene && minDistance > count) {
      minDistance = count;
    }
    // 去重变化的基因
    const set: Set<string> = new Set();
    for (let i = 0; i < curGen.length; i++) {
      for (let j = 0; j < GeneIndexes.length; j++) {
        const nextGene =
          curGen.substring(0, i) + GeneIndexes[j] + curGen.substring(i + 1);
        // 变化的基因在基因库内
        if (!usedSet.has(nextGene) && indexes.has(nextGene)) {
          usedSet.add(nextGene);
          set.add(nextGene);
        }
      }
    }
    set.forEach((gene) => {
      queue.push({
        gene,
        count: count + 1,
      });
    });
  }
  return minDistance === Number.MAX_VALUE ? -1 : minDistance;
}
