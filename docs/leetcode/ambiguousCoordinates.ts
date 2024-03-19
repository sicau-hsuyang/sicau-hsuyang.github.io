function splitStr(s: string) {
  const pairs: Array<[string, string]> = [];
  for (let i = 1; i < s.length; i++) {
    const leftSubstr = s.slice(0, i);
    const rightSubstr = s.slice(i);
    // 全是0
    if (!/^0{2,}$/.test(leftSubstr) && !/^0{2,}$/.test(rightSubstr)) {
      pairs.push([leftSubstr, rightSubstr]);
    }
  }
  return pairs;
}

function generatePair(s: [string, string]): string[][] {
  const results: string[][] = [];
  const numGroup1 = magnifyNum(s[0]);
  const numGroup2 = magnifyNum(s[1]);
  numGroup1.forEach((num1) => {
    numGroup2.forEach((num2) => {
      results.push([num1, num2]);
    });
  });
  return results;
}

/**
 * 放大数字，入参是一个合法的数字
 * @param s
 * @returns
 */
export function magnifyNum(s: string): string[] {
  if (s.length === 1) {
    return [s];
  } else {
    const results: string[] = [];
    // 非连续的前导，如01 02
    if (!/^0+/.test(s)) {
      results.push(s);
    }
    for (let i = 1; i < s.length; i++) {
      const leftSubstr = s.slice(0, i);
      const rightSubstr = s.slice(i);
      const str = leftSubstr + "." + rightSubstr;
      // 00.场景 010. 01.
      if (/^0[0-9]+\./.test(str)) {
        continue;
      }
      // 0.0的场景 0.010 0.00 0.10
      else if (/\.\d*0$/.test(str)) {
        continue;
      } else {
        results.push(str);
      }
    }
    return results;
  }
}

export function ambiguousCoordinates(s: string): string[] {
  const digitStr = s.slice(1, s.length - 1);
  const pairs = splitStr(digitStr);
  const results: string[] = [];
  pairs.forEach((pair) => {
    const group = generatePair(pair);
    group.forEach((item) => {
      const str = "(" + item[0] + ", " + item[1] + ")";
      results.push(str);
    });
  });
  return results;
}

/**

  0001


  1000101

 */
