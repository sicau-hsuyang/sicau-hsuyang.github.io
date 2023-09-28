import { arrToLinkedList } from "leetcode-test-utils";
import {
  getGcd,
  insertGreatestCommonDivisors,
} from "./insertGreatestCommonDivisors";

describe("greatest common divisors", () => {
  it("gcd 18 6", () => {
    const val = getGcd(18, 6);
    expect(val).toBe(6);
  });

  it("gcd 1997 和 615 ", () => {
    const val = getGcd(1997, 615);
    expect(val).toBe(1);
  });
});

describe("insertGreatestCommonDivisors", () => {
  it("case 1", () => {
    const list = arrToLinkedList([18, 6, 10, 3]);
    const newList = insertGreatestCommonDivisors(list as any);
    console.log(newList);
  });

  it("case 2", () => {
    const list = arrToLinkedList([18, 6]);
    const newList = insertGreatestCommonDivisors(list as any);
    console.log(newList);
  });

  it("case 3", () => {
    const list = arrToLinkedList([18]);
    const newList = insertGreatestCommonDivisors(list as any);
    console.log(newList);
  });
});
