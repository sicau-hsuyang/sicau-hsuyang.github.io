import { isPossible } from "./isPossible";

describe("isPossible", () => {
  it("case 1", () => {
    const nums = [1, 2, 3, 3, 4, 5];
    const possible = isPossible(nums);
    console.log(possible);
  });

  it("case 2", () => {
    const nums = [1, 2, 3, 3, 4, 4, 5, 5];
    const possible = isPossible(nums);
    console.log(possible);
  });

  it("case 3", () => {
    const nums = [1, 2, 3, 4, 4, 5];
    const possible = isPossible(nums);
    console.log(possible);
  });

  it("case 4", () => {
    const nums = [1, 3, 3, 4, 4, 7, 8, 8, 9, 10];
    const possible = isPossible(nums);
    console.log(possible);
  });

  it("case 5", () => {
    // TODO: 有问题的case
    const nums = [1, 2, 3, 4, 5, 5, 6, 7];
    const possible = isPossible(nums);
    console.log(possible);
    /**
     123
     45
     567
     */
  });
});
