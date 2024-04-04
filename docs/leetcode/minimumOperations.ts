interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function minimumOperations(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  const queue: TreeNode[][] = [[root]];
  let count = 0;
  while (queue.length) {
    const chunk = queue.shift()!;
    const nextChunk: TreeNode[] = [];
    chunk.forEach((node) => {
      if (node.left) {
        nextChunk.push(node.left);
      }
      if (node.right) {
        nextChunk.push(node.right);
      }
    });
    let levelCount = calcMiniumOpt(chunk.map((v) => v.val));
    count += levelCount;
    if (nextChunk.length) {
      queue.push(nextChunk);
    }
  }
  return count;
}

// function calcMiniumOpt(nums: number[]): number {
//   let result = 0;
//   // 创建一个辅助数组，包含每个数字及其原始索引的信息
//   const arr = nums.map((value, index) => ({ value, index }));
//   // 根据数字的大小对辅助数组进行排序
//   arr.sort((a, b) => a.value - b.value);
//   // 用一个数组visited记录每个元素是否已经在正确的位置或已被访问过
//   const visited = new Array(nums.length).fill(false);
//   for (let i = 0; i < nums.length; i++) {
//     // 如果已经访问过，或者元素已经在正确的位置，则跳过
//     if (visited[i] || arr[i].index === i) {
//       continue;
//     }
//     // 计算每个循环（环）的大小
//     let cycleSize = 0;
//     let j = i;
//     while (!visited[j]) {
//       visited[j] = true;
//       j = arr[j].index;
//       cycleSize++;
//     }
//     // 如果环的大小大于0，那么需要的交换次数是环的大小减1
//     if (cycleSize > 0) {
//       result += cycleSize - 1;
//     }
//   }
//   return result;
// }
