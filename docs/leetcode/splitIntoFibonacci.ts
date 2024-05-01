function isValidNum(num: string) {
  /**
   * 0
   * 00 000 0000
   * 01 001
   */

  return (
    num === "0" ||
    (!/^0{1,}\d*/.test(num) && Number.parseInt(num) < Math.pow(2, 31))
  );
}

function validFib(nums: string[]) {
  if (nums.length <= 2) {
    return false;
  }
  for (let i = 0; i < nums.length - 2; i++) {
    let a = nums[i];
    let b = nums[i + 1];
    let c = nums[i + 2];
    // 不符合则终止计算
    if (Number.parseInt(a) + Number.parseInt(b) !== Number.parseInt(c)) {
      return false;
    }
  }
  return true;
}

function splitPlans(num: string, offset = 0): string[][] {
  if (offset >= num.length) {
    return [];
  }
  const plans: string[][] = [];
  for (let i = offset; i < num.length; i++) {
    const digit = num.substring(offset, i + 1);
    const valid = isValidNum(digit);
    if (!valid) {
      continue;
    }
    if (i + 1 === num.length) {
      // console.log(digit);
      if (isValidNum(digit)) {
        plans.push([digit]);
      }
    } else {
      const subsets = splitPlans(num, i + 1);
      subsets.forEach((v) => {
        plans.push([digit, ...v]);
      });
    }
  }
  return plans;
}

export function splitIntoFibonacci(num: string): number[] {
  const results = splitPlans(num, 0);
  const target = results.find((v) => validFib(v));
  return target?.map((v) => Number.parseInt(v)) || [];
}
