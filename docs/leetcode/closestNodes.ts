/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function closestNodes(
  root: TreeNode | null,
  queries: number[]
): number[][] {
  const seqs = traverse(root);
  return queries.map((v) => {
    // 如果比第一个还小
    if (v < seqs[0]) {
      return [-1, seqs[0]];
    }
    // 如果比最后一个还大
    if (v > seqs[seqs.length - 1]) {
      return [seqs[seqs.length - 1], -1];
    }
    const res = binarySearch(seqs, v);
    // 如果找到了
    if (res.result) {
      const val = seqs[res.idx];
      return [val, val];
    } else {
      // 如果找到的是非预期索引
      const temp = seqs[res.idx];
      if (v > seqs[res.idx - 1] && v < temp) {
        return [seqs[res.idx - 1], temp];
      } else {
        return [temp, seqs[res.idx + 1]];
      }
    }
  });
}

function binarySearch(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;
  let mid = Math.floor((left + right) / 2);
  let preLeft;
  let preRight;
  while (left <= right) {
    const val = nums[mid];
    if (val === target) {
      // 找到了，给出精确的idx
      return { result: true, idx: mid };
    } else if (val < target) {
      preLeft = left;
      left = mid + 1;
    } else if (val > target) {
      right = mid - 1;
      preRight = right;
    }
    mid = Math.floor((left + right) / 2);
  }
  // 找不到，给出不精确的idx
  return { result: false, idx: preRight };
}

export function traverse(root: TreeNode | null) {
  const seqs: number[] = [];
  if (!root) {
    return seqs;
  }
  const stack: TreeNode[] = [];
  let node: TreeNode | null = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    if (stack.length) {
      node = stack.pop()!;
      seqs.push(node.val);
      node = node.right;
    }
  }
  return seqs;
}
