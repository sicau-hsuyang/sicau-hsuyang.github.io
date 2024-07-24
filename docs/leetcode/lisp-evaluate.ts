export function evaluate(expression: string): number {
  const map: Map<string, string> = new Map();
  const stack: string[] = [];
  let temp = "";
  let offset = 0;
  while (offset < expression.length) {
    const char = expression[offset++];
    if (char === " ") {
      continue;
    }
    // 遇到了后括号
    if (char === ")") {
    } else {
      temp += char;
      // 如果此刻已经是定义的赋值语句了
      if (temp === "let") {
      }
      // 乘
      else if (temp === "mult") {
      }
      // 加
      else if (temp === "add") {
      }
    }
  }
}
