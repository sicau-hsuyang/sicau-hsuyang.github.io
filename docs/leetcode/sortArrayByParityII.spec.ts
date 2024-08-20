import { sortArrayByParityII } from "./sortArrayByParityII";

describe("sortArrayByParityII", () => {
  it("case 1", () => {
    const nums = [4, 2, 5, 7];
    sortArrayByParityII(nums);
    // 极端情况，左半截全是偶数，右半截全是奇数
  });

  it("case 2", () => {
    const nums = [4, 1, 1, 0, 1, 0];
    sortArrayByParityII(nums);
  });

  it("case 3", () => {
    const nums = [1, 4, 4, 3, 0, 3];
    sortArrayByParityII(nums);
  });
});
