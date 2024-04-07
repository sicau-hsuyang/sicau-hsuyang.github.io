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

function getTreeHeight(root: TreeNode | null) {}

export function printTree(root: TreeNode | null): string[][] {}

/**

   1
 2   3
4 5 6 7
mid = 7/2 = 3
[0, 0, 0, 1, 0, 0, 0]
left: mid = 3 - 2 = 1
right: mid = 3 + 2 = 5
[0, 2, 0, 0, 0, 3, 0]
left: mid = 3 - 2
[4, 0, 5, 0, 6, 0, 7]

 */
