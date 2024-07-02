export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (["+", "-", "*", "/"].includes(token)) {
      const num2 = stack.pop()!;
      const num1 = stack.pop()!;
      if (token === "+") {
        stack.push(num1 + num2);
      } else if (token === "-") {
        stack.push(num1 - num2);
      } else if (token === "*") {
        stack.push(num1 * num2);
      } else if (token === "/") {
        if (num1 * num2 < 0) {
          let val = -1 * Math.floor(Math.abs(num1 / num2));
          stack.push(val);
        } else {
          stack.push(Math.floor(num1 / num2));
        }
      }
    } else {
      stack.push(Number.parseInt(token));
    }
  }
  return stack[0];
}
