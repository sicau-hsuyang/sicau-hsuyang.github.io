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

import { cloneDeep } from "lodash";

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function generateTrees(n: number): Array<TreeNode | null> {
  const map: Map<number, Array<TreeNode>> = new Map();
  map.set(1, [createNode(1)]);
  const root1 = createNode(1);
  root1.right = createNode(2);
  const root2 = createNode(2);
  root2.left = createNode(1);
  map.set(2, [root1, root2]);
  if (n === 1) {
    return map.get(1)!;
  } else if (n === 2) {
    return map.get(2)!;
  } else {
    for (let i = 3; i <= n; i++) {
      const results: TreeNode[] = [];
      for (let k = 1; k <= i; k++) {
        let dpLeft = cloneDeep(map.get(i - k) || []);
        let dpRight = cloneDeep(map.get(k - 1) || []);
        if (dpRight.length === 0) {
          dpLeft.forEach((subTree) => {
            const node = createNode(k);
            node.left = subTree;
            results.push(node)
          });
        } else if (dpLeft.length === 0) {
          dpRight.forEach((subTree) => {
            const node = createNode(k);
            node.right = subTree;
            results.push(node)
          });
        } else {
          for (let l = 0; l < dpLeft.length; l++) {
            for (let r = 0; r < dpRight.length; r++) {
              const node = createNode(k);
              node.left = dpLeft[l];
              node.right = dpRight[r];
              results.push(node);
            }
          }
        }
      }
      map.set(3, results);
    }
    return map.get(n)!;
  }
}

function createNode<T>(val: T) {
  return {
    val,
    left: null,
    right: null,
  } as TreeNode;
}
