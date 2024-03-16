import { removeStars } from "./removeStars";

describe("removeStars", () => {
  it("case 1", () => {
    const s = "leet**cod*e";
    const res = removeStars(s);
    expect(res).toBe("lecoe");
  });
});
