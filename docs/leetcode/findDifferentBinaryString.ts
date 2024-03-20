export function calc(n: number, nums: string[], plans: string[]): string {
  if (n === 1) {
    for (let i = 0; i < plans.length; i++) {
      const str = plans[i];
      const case1 = str + "0";
      const case2 = str + "1";
      if (!nums.includes(case1)) {
        return case1;
      }
      if (!nums.includes(case2)) {
        return case2;
      }
    }
    return "";
  } else {
    const nextPlans = [
      ...plans.map((str) => {
        return str + "0";
      }),
      ...plans.map((str) => {
        return str + "1";
      }),
    ];
    return calc(n - 1, nums, nextPlans);
  }
}

export function findDifferentBinaryString(nums: string[]): string {
  const len = nums[0].length;
  if (len - 1 === 0) {
    return nums[0] === "0" ? "1" : "0";
  }
  return calc(len - 1, nums, ["0", "1"]);
}
