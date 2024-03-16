import { arrToBinaryTree } from 'leetcode-test-utils'
import { diameterOfBinaryTree } from './diameterOfBinaryTree'

describe("diameterOfBinaryTree", () => {

  it("case 1", () => {
    const arr = [1,2,3,4,5]
    const tree = arrToBinaryTree(arr);
    const res = diameterOfBinaryTree(tree)
    expect(res).toBe(3);
  })
})