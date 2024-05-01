function calc(k: number, n: number, offset: number): number[][] {
  if (offset > 9) {
    return [];
  }
  if (k === 1) {
    return n > 9 || n < offset ? [] : [[n]];
  } else if (k >= 1 && n === 0) {
    return [];
  } else {
    const distPlans: number[][] = [];
    // 当前数字
    const num = offset;
    // 不选
    const plans1 = calc(k, n, num + 1);
    for (let s = 0; s < plans1.length; s++) {
      const plan = [...plans1[s]];
      distPlans.push(plan);
    }
    // 选 从下一位开始计算
    const plans2 = calc(k - 1, n - num, num + 1);
    for (let s = 0; s < plans2.length; s++) {
      const plan = [num, ...plans2[s]];
      distPlans.push(plan);
    }
    // if (distPlans.length) {
    //   console.log(distPlans);
    // }
    return distPlans;
  }
}

export function combinationSum3(k: number, n: number): number[][] {
  // for (let i = 1; i < 9; i++) {
  //   const plans = calc(k, n, i);
  //   console.log(plans);
  // }
  const plans = calc(k, n, 1);
  // const plans = calc(k, n, 2);
  console.log(plans);
  return plans;
}
