import { singleNonDuplicate } from "./singleNonDuplicate";

describe("singleNonDuplicate", () => {
  it("case 0", () => {
    const nums = [1, 2, 2, 3, 3, 4, 4, 8, 8];
    const val = singleNonDuplicate(nums);
    console.log(val);
  });

  it("case 1", () => {
    const nums = [1, 1, 2, 3, 3, 4, 4, 8, 8];
    const val = singleNonDuplicate(nums);
    console.log(val);
  });

  it("case 2", () => {
    const nums = [1, 1, 2, 2, 3, 4, 4, 8, 8];
    const val = singleNonDuplicate(nums);
    console.log(val);
  });

  it("case 3", () => {
    const nums = [1, 1, 2, 2, 3, 3, 4, 8, 8];
    const val = singleNonDuplicate(nums);
    console.log(val);
  });

  it("case 4", () => {
    const nums = [1, 1, 2, 2, 3, 3, 4, 4, 8];
    const val = singleNonDuplicate(nums);
    console.log(val);
  });

  it("case 5", () => {
    const nums = [1, 1, 2];
    const val = singleNonDuplicate(nums);
    console.log(val);
  });

  it("case 6", () => {
    const nums = [1, 2, 2];
    const val = singleNonDuplicate(nums);
    console.log(val);
  });

  it("case 8", () => {
    const nums = [1];
    const val = singleNonDuplicate(nums);
    console.log(val);
  });
});
