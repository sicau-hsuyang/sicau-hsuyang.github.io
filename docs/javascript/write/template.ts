/**
 * 以词法分析实现的简单模板引擎
 * @param template 待处理模板字符串
 * @param data 数据
 * @returns
 */
export function render(template: string, data: Record<string, any>) {
  const stack: string[] = [];
  let leftBracket = "";
  let rightBracket = "";
  let compileStart = false;
  for (let i = 0; i < template.length; i++) {
    const char = template[i];
    if (char === "{" && !compileStart) {
      leftBracket += char;
      if (leftBracket === "{{") {
        stack.push(leftBracket);
        leftBracket = "";
        compileStart = true;
      }
    } else if (char === "}" && compileStart) {
      rightBracket += char;
      if (rightBracket === "}}") {
        rightBracket = "";
        let prop = "";
        let leftSentinel = stack.pop();
        while (leftSentinel != "{{") {
          prop = leftSentinel + prop;
          leftSentinel = stack.pop();
        }
        stack.push(
          typeof data[prop] === "undefined" ? "undefined" : data[prop]
        );
        compileStart = false;
      }
    } else {
      if ((compileStart && char === "{") || (!compileStart && char === "}")) {
        console.log("illegal character, the template engine will ignore");
        continue;
      }
      stack.push(char);
    }
  }
  return stack.join("");
}
