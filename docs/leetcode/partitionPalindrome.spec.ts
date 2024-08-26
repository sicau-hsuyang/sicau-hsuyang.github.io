import { partition } from "./partitionPalindrome";

describe("partition", () => {
  it("case 1", () => {
    const s = "google";
    const res = partition(s);
    console.log(res);
  });

  it("case 3", () => {
    const s = "elgooggoogle";
    const res = partition(s);
    console.log(res, res.length);
  });

  it("case 10", () => {
    const t = Date.now();
    const s = "aaaaaaaaaaaaaaaa";
    const res = partition(s);
    // console.log(res, res.length);
    console.log(Date.now() - t, "时间花费");
  });

  it("case 11", () => {
    const t = Date.now();
    const s = "abababababababa";
    const res = partition(s);
    console.log(res, res.length);
    console.log(Date.now() - t, "时间花费");
  });

  it("case 2", () => {
    const s = "bb";
    const res = partition(s);
    console.log(res);
  });
});
