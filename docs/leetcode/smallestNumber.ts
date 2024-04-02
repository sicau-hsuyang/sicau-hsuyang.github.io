function calc(pattern: string, preNum: number, usedMap: Set<number>) {
  if (pattern.length === 1) {
    if (pattern[0] === "D") {
      let num = preNum - 1;
      while (num >= 1) {
        if (usedMap.has(num)) {
          num--;
        }
      }
      if (num >= 1) {
        return String(num);
      } else {
        return "";
      }
    } else {
      let num = preNum + 1;
      while (num <= 9) {
        if (usedMap.has(num)) {
          num++;
        }
      }
      if (num <= 9) {
        return String(num);
      } else {
        return "";
      }
    }
  } else {
    const char = pattern[0];
    const nextPattern = pattern.substring(1);
    if (char === "I") {
      const num = preNum === 0 ? 9 : preNum - 1;
      for (let i = num; i >= 1; i--) {
        calc();
      }
    } else {
    }
  }
}

export function smallestNumber(pattern: string): string {}
