export function generateParenthesis(n: number): string[] {
  if (n === 1) {
    return ["()"];
  } else {
    let preResults = generateParenthesis(n - 1);
    const output: string[] = [];
    const set: Set<string> = new Set();
    for (let i = 0; i < preResults.length; i++) {
      const result = preResults[i];
      for (let j = 0; j < result.length; j++) {
        let prefix = result.slice(0, j);
        let suffix = result.slice(j);
        let str = prefix + "()" + suffix;
        if (!set.has(str)) {
          set.add(str);
          output.push(str);
        }
      }
    }
    return output;
  }
}

[
  "(((())))",

  "((()()))",

  "((())())",

  "((()))()",

  "(()(()))",

  "(()()())",

  "(()())()",

  "(())(())",

  "(())()()",
  "()((()))",
  "()(()())",
  "()(())()",
  "()()(())",
  "()()()()",
];

/**
 
()

()()
(())

()()()
(()())

()(())
(())()
((()))

 */
