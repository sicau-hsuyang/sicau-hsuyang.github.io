import { canPartitionKSubsets } from "./canPartitionKSubsets";

describe("canPartitionKSubsets", () => {
  it("case 1", () => {
    let now1 = new Date();
    const nums = [4, 3, 2, 3, 2, 5, 2, 1, 3, 1, 2],
      k = 4;
    const flag = canPartitionKSubsets(nums, k);
    console.log(flag);
    let now2 = new Date();
    console.log("花费时间" + (now2.getTime() - now1.getTime()));
  });

  it("case 2", () => {
    const nums = [2, 2, 2, 2, 3, 4, 5],
      k = 4;
    const flag = canPartitionKSubsets(nums, k);
    console.log(flag);
  });

  it("case 3", () => {
    let now1 = new Date();
    const nums = [4, 3, 2, 3, 5, 2, 1, 4, 3, 2, 3, 1, 2, 1, 4],
      k = 16;
    const flag = canPartitionKSubsets(nums, k);
    console.log(flag);
    let now2 = new Date();
    console.log("花费时间" + (now2.getTime() - now1.getTime()));
  });
});
