import { maxSlidingWindow } from "./maxSlidingWindow";

describe("maxSlidingWindow", () => {
  it("case 1", () => {
    const nums = [1, 3, -1, -3, 5, 3, 6, 7],
      k = 3;
    maxSlidingWindow(nums, k);
  });
});
