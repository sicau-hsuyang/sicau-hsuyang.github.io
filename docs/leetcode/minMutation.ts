export function minMutation(
  startGene: string,
  endGene: string,
  bank: string[]
): number {
  const indexes = new Map();
  for (let i = 0; i < bank.length; i++) {
    const gene = bank[i];
    indexes.set(gene, i);
  }
  // 找到结尾的基因的位置
  const endGenePos = bank.findIndex((v) => v === endGene);
  const existGeneMap: Set<string> = new Set();
  existGeneMap.add(startGene)
  const queue: string[] = [startGene];
  let min = Number.MAX_VALUE;
  while (queue.length) {
    const curGene = queue.shift()!;
    const pos = indexes.get(curGene) || -1;
    // 并且是要在前面的基因中
    if (pos !== -1 && pos <= endGenePos) {
      const distance = endGenePos - pos + 1;
      if (distance < min) {
        min = distance;
      }
    }
    for (let i = 0; i < curGene.length; i++) {
      const leftSubStr = curGene.slice(0, i);
      const curChar = ["A", "G", "C", "T"].filter((v) => v !== curGene[i]);
      const rightSubStr = curGene.slice(i + 1);
      curChar.forEach((gene) => {
        const nextGene = leftSubStr + gene + rightSubStr;
        if (!existGeneMap.has(nextGene)) {
          queue.push(nextGene);
          existGeneMap.add(nextGene);
        }
      });
    }
    console.log("PASS");
  }
  return min === Number.MAX_VALUE ? -1 : min;
}
