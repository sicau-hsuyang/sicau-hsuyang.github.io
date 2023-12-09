export function diffWaysToCompute(expression: string): number[] {
  // 如果不包含任何符号的话，说明可以直接解值的
  if (!/[\*\-\+]+/.test(expression)) {
    return [Number.parseFloat(expression)];
  }
  let res: number[] = [];
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    const left = expression.substring(0, i);
    const right = expression.substring(i + 1);
    let action: ((a: number, b: number) => number) | null = null;
    if (char === "*") {
      action = (a, b) => a * b;
    } else if (char === "+") {
      action = (a, b) => a + b;
    } else if (char === "-") {
      action = (a, b) => a - b;
    } else {
      continue;
    }
    const res1 = diffWaysToCompute(left);
    const res2 = diffWaysToCompute(right);
    for (let k = 0; k < res1.length; k++) {
      let l = res1[k];
      for (let p = 0; p < res2.length; p++) {
        let r = res2[p];
        res.push(action(l, r));
      }
    }
  }
  return res;
}
