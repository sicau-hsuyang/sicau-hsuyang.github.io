import { SimpleDsu } from "leetcode-test-utils";
export function makeConnected(n: number, connections: number[][]): number {
  const dsu = new SimpleDsu(n);
  let redundancyConnect = 0;
  connections.forEach((node) => {
    const computer1 = node[0] + 1;
    const computer2 = node[1] + 1;
    // 如果存在冗余连接
    if (dsu.find(computer1) === dsu.find(computer2)) {
      // 记住冗余的网线数量
      redundancyConnect++;
    } else {
      dsu.union(computer1, computer2);
    }
  });
  // 直接不需要插拔就可以通信
  const component = dsu.count();
  if (component === 1) {
    return 0;
  }
  // 如果网线用完了还是不能得到一个整体
  if (component - 1 > redundancyConnect) {
    return -1;
  }
  return component - 1;
}
