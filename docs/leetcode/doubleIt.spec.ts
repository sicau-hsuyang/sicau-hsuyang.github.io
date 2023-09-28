import { arrToLinkedList } from "leetcode-test-utils";
import { doubleIt } from "./doubleIt";

describe("double it", () => {
  it("case 1", () => {
    const arr = [1, 8, 9];
    const list = arrToLinkedList(arr);
    const newList = doubleIt(list as any);
    console.log(newList);
  });

  it("case 2", () => {
    const arr = [9, 9, 9];
    const list = arrToLinkedList(arr);
    const newList = doubleIt(list as any);
    console.log(newList);
  });
});
