import { removeNodes } from "./removeNodes";
import { GeneralLinkedNode, arrToLinkedList } from "leetcode-test-utils";

describe("remove nodes", () => {
  it("case 1", () => {
    let list = arrToLinkedList([5, 2, 13, 3, 8]);
    list = removeNodes(list);
    const res: number[] = [];
    let node: GeneralLinkedNode<number> | undefined | null = list!;
    while (node) {
      res.push(node.val);
      node = node.next;
    }
    expect(res).toEqual([13, 8]);
  });

  it("case 2", () => {
    let list = arrToLinkedList([5, 2, 13, 3, 2]);
    list = removeNodes(list);
    const res: number[] = [];
    let node: GeneralLinkedNode<number> | undefined | null = list!;
    while (node) {
      res.push(node.val);
      node = node.next;
    }
    expect(res).toEqual([13, 3, 2]);
  });

  it("case 3", () => {
    let list = arrToLinkedList([16, 2, 3, 4, 5, 6, 7, 13, 3, 8]);
    list = removeNodes(list);
    const res: number[] = [];
    let node: GeneralLinkedNode<number> | undefined | null = list!;
    while (node) {
      res.push(node.val);
      node = node.next;
    }
    expect(res).toEqual([16, 13, 8]);
  });

  it("case 4", () => {
    let list = arrToLinkedList([16, 2, 3, 4, 5, 6, 7, 13, 3, 2, 1]);
    list = removeNodes(list);
    const res: number[] = [];
    let node: GeneralLinkedNode<number> | undefined | null = list!;
    while (node) {
      res.push(node.val);
      node = node.next;
    }
    expect(res).toEqual([16, 13, 3, 2, 1]);
  });

  it("case 5", () => {
    let list = arrToLinkedList([16, 2, 3, 4, 5, 6, 7, 13, 18, 3, 4, 2, 1]);
    list = removeNodes(list);
    const res: number[] = [];
    let node: GeneralLinkedNode<number> | undefined | null = list!;
    while (node) {
      res.push(node.val);
      node = node.next;
    }
    expect(res).toEqual([18, 4, 2, 1]);
  });
});
