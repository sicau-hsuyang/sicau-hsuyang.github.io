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

function getHeight(root: TreeNode | null) {
  if (!root) {
    return 0;
  }
  return 1 + Math.max(getHeight(root.left), getHeight(root.right));
}

function traverse(
  root: TreeNode | null,
  height: number,
  isLeft: boolean,
  row: number,
  col: number,
  matrix: string[][]
) {
  if (!root) {
    return;
  }
  let calcCol = isLeft
    ? col - 2 ** (height - row - 1)
    : col + 2 ** (height - row - 1);
  matrix[row][calcCol] = String(root.val);
  traverse(root.left, height, true, row + 1, calcCol, matrix);
  traverse(root.right, height, false, row + 1, calcCol, matrix);
}

export function printTree(root: TreeNode): string[][] {
  const treeHeight = getHeight(root);
  let width = 2 ** treeHeight - 1;
  const res: string[][] = Array.from({
    length: treeHeight,
  }).map((v) => {
    return Array.from({
      length: width,
    }).fill("");
  }) as string[][];
  let col = Math.floor((width - 1) / 2);
  res[0][col] = String(root.val);
  if (root.left) {
    traverse(root.left, treeHeight, true, 1, col, res);
  }
  if (root.right) {
    traverse(root.right, treeHeight, false, 1, col, res);
  }
  return res;
}
