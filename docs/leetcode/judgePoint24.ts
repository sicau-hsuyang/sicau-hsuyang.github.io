/**
 * 求全排列
 * @param cards
 */
function getPermutation(cards: number[]): number[][] {
  if (cards.length === 1) {
    return [cards];
  } else {
    const results: number[][] = [];
    for (let i = 0; i < cards.length; i++) {
      const num = cards[i];
      const leftArr = cards.slice(0, i);
      const rightArr = cards.slice(i + 1);
      const preResults = getPermutation([...leftArr, ...rightArr]);
      preResults.forEach((arr) => {
        results.push([num, ...arr]);
      });
    }
    return results;
  }
}

/**
 * 取3个符号
 */
function getOperator(): string[] {
  const operator = ["*", "+", "-", "/"];
  const results: string[] = [];
  for (let d = 0; d < operator.length; d++) {
    const leftArr = operator.slice(0, d);
    const rightArr = operator.slice(d + 1);
    const arr = [...leftArr, ...rightArr];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        for (let k = 0; k < arr.length; k++) {
          results.push(`${arr[i]}${arr[j]}${arr[k]}`);
        }
      }
    }
  }
  return results;
}

function uniqueArray(arr: number[][]): number[][] {
  const set = new Set(arr.map((v) => v.join('')));
  return [...set].map((v) => {
    return v.split("").map((v) => {
      return Number.parseInt(v);
    });
  });
}

export function judgePoint24(cards: number[]): boolean {
  // 24
  const permutation = uniqueArray(getPermutation(cards));
  // 4 * 27
  const operatorPermutation = getOperator();
  for (let i = 0; i < permutation.length; i++) {
    const digits = permutation[i];
    for (let j = 0; j < operatorPermutation.length; j++) {
      const operator = operatorPermutation[j];
      // 9
      const pattern = [
        "A@B#C!D",
        "(A@B)#C!D",
        "A@B#(C!D)",
        "A@(B#C)!D",
        "(A@B)#(C!D)",
        "A@(B#(C!D))",
        "A@((B#C)!D)",
        "((A@B)#C)!D",
        "(A@(B#C))!D",
      ];
      for (let k = 0; k < pattern.length; k++) {
        const thisPattern = pattern[k];
        const expression = thisPattern
          .replace(/A/g, String(digits[0]))
          .replace(/B/g, String(digits[1]))
          .replace(/C/g, String(digits[2]))
          .replace(/D/g, String(digits[3]))
          .replace(/@/g, operator[0])
          .replace(/#/g, operator[1])
          .replace(/!/g, operator[2]);
        const val = eval(expression);
        if (Math.abs(val - 24) <= 0.000000001) {
          console.log(expression);
          return true;
        }
      }
    }
  }
  /**
  0个括号
  A?B?C?D
  一个括号
  (A?B)?C?D
  A?B?(C?D)
  A?(B?C)?D
  2个括号
  (A?B)?(C?D)
  ((A?B)?C)?D
  (A?(B?C))?D
  A?(B?(C?D))
  A?((B?C)?D)
  */
  return false;
}
