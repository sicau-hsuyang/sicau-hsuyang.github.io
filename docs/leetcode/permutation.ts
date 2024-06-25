export function permutation(S: string, set: Set<string> = new Set()): string[] {
  if (S.length === 1) {
    return [S];
  } else {
    const subStr = S.substring(1);
    const char = S[0];
    const preResults = permutation(subStr);
    const results: string[] = [];
    preResults.forEach((str) => {
      for (let i = 0; i <= str.length; i++) {
        const leftStr = str.substring(0, i);
        const rightStr = str.substring(i);
        const combineStr = leftStr + char + rightStr;
        if (!set.has(combineStr)) {
          results.push(combineStr);
          set.add(combineStr);
        }
      }
    });
    return results;
  }
}

/**
 

qwe

q

qw
wq

qwe
qew
eqw
+
ewq
weq
wqe

 */
