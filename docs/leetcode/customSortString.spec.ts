import { customSortString } from "./customSortString";

describe("customSortString", () => {
  it("case 1", () => {
    const order = "cba",
      s = "abcd";
    customSortString(order, s);
  });

  it("case 2", () => {
    const order = "kqep",
      s = "pekeq";
    const res = customSortString(order, s);
    console.log(res);
  });
});
