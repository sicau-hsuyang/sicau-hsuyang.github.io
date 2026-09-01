import { isInterleave } from "./isInterleave";

describe("isInterleave", () => {
  it("case 1", () => {
    const s1 = "aabcc",
      s2 = "dbbca",
      s3 = "aadbbcbcac";
    const res = isInterleave(s1, s2, s3);
    expect(res).toBe(true);
  });
});
