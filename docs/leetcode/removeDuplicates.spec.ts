import { removeDuplicates } from "./removeDuplicates";

describe("removeDuplicates", () => {
  it("case 1", () => {
    const s = "deeedbbcccbdaa",
      k = 3;
    const res = removeDuplicates(s, k);
    console.log(res);
  });

  it("case 2", () => {
    const s = "pbbcggttciiippooaais",
      k = 2;
    const res = removeDuplicates(s, k);
    console.log(res);
  });
});
