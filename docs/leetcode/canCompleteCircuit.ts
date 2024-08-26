export function canCompleteCircuit(gas: number[], cost: number[]): number {
  const sumGas = gas.reduce((accu, g) => accu + g);
  const sumCost = cost.reduce((accu, c) => accu + c);
  // 总消耗大于总油量，肯定不可能的
  if (sumCost > sumGas) {
    return -1;
  }
  for (let i = 0; i < gas.length; ) {
    // 累计的油量
    let currentGas = gas[i];
    let offset = i;
    while (true) {
      currentGas -= cost[offset];
      if (currentGas < 0) {
        // 在这之前的位置都是不可行的，因为它们之前的节点已经帮忙尝试过了
        i = offset + 1;
        break;
      }
      offset++;
      offset %= gas.length;
      // 再次到达当前的位置，则证明已经可以环绕一圈了
      if (offset === i) {
        break;
      }
      currentGas += gas[offset];
    }
    if (offset === i) {
      return offset;
    }
  }
  return -1;
}
