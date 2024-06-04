function calc(n: number): string[] {
  if (n === 1) {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  } else {
    const results: Set<string> = new Set();
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const preResults = calc(n - 1);
    digits.forEach((num) => {
      preResults.forEach((str) => {
        for (let i = 0; i <= str.length; i++) {
          const leftStr = str.substring(0, i);
          const rightStr = str.substring(i);
          const val = leftStr + num + rightStr;
          if (new Set(val.split("")).size < val.length) {
            results.add(val);
          }
        }
      });
    });
    return [...results]
  }
}

export function countNumbersWithUniqueDigits(n: number): number {
  
}

/**

  1 [0, 1) -> 0
  2 [0, 100) -> 11 22 33 44 55 66 77 88 99
  3 [0, 1000] - 00 11 22 33 44 55 66 77 88 99




 */
