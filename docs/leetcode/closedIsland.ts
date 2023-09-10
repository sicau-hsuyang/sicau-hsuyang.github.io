import { SimpleDsu } from "leetcode-test-utils";

export function closedIsland(grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;
  const size = m * n;
  // 用来区分是边际的哈希表
  const markEdgeMap: Map<number, boolean> = new Map();
  // 用来区分是水
  const waterMap: Map<number, boolean> = new Map();
  const dsu = new SimpleDsu(size);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      // 如果当前节点是陆地
      if (cell === 0) {
        // 对于4个边界上面的土地
        if (
          row === 0 ||
          col === 0 ||
          row === grid.length - 1 ||
          col === grid[row].length - 1
        ) {
          // 用哈希表记录是编号为？的点是边际
          const num = row * m + col;
          markEdgeMap.set(num, true);
        }
        // 如果它的上一行的值是陆地
        if (row > 0 && grid[row - 1][col] === 0) {
          // 如果当前节点的向上一节点是陆地
          const preNodeNum = (row - 1) * m + col;
          const preNodeIdx = dsu.find(preNodeNum);
          const curNodeNum = row * m + col;
          const curNodeIdx = dsu.find(curNodeNum);
          // 将两个节点做归并
          dsu.union(preNodeIdx, curNodeIdx);
          if (markEdgeMap.get(preNodeNum) || markEdgeMap.get(curNodeNum)) {
            markEdgeMap.set(preNodeNum, true);
            markEdgeMap.set(curNodeNum, true);
          }
        }
        // 如果它的前一列是陆地
        if (col > 0 && grid[row][col - 1] === 0) {
          // 如果当前节点的向左一节点是陆地
          const preNodeNum = row * m + col - 1;
          const preNodeIdx = dsu.find(preNodeNum);
          const curNodeNum = row * m + col;
          const curNodeIdx = dsu.find(curNodeNum);
          // 将两个节点做归并
          dsu.union(preNodeIdx, curNodeIdx);
          if (markEdgeMap.get(preNodeNum) || markEdgeMap.get(curNodeNum)) {
            markEdgeMap.set(preNodeNum, true);
            markEdgeMap.set(curNodeNum, true);
          }
        }
      } else {
        // 当前节点是水，用哈希表记住
        waterMap.set(row * m + col, true);
      }
    }
  }
  let total = 0;
  dsu.dataSet.forEach((val, idx) => {
    // 当前节点没有跟海岸交接的陆地，当前分量不是水
    if (val < 0 && !markEdgeMap.has(idx) && !waterMap.has(idx)) {
      total++;
    }
  });
  return total;
}
