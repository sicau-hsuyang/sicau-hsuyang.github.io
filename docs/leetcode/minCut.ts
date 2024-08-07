function isPalindrome(s: string, start: number, end: number): boolean {
  // 输入检查，确保索引在合理范围内
  if (start < 0 || end >= s.length || start > end) {
    throw new Error("Invalid start or end index");
  }

  while (start < end) {
    if (s[start] !== s[end]) {
      return false;
    }
    start++;
    end--;
  }

  return true;
}

function cut(s: string, start: number, end: number, memo: number[][]) {
  if (memo[start][end] !== -1) {
    return memo[start][end];
  }
  const isRight = isPalindrome(s, start, end);
  if (isRight) {
    memo[start][end] = 0;
    return 0;
  }
  let char = s[start];
  let minCutTimes = Number.MAX_VALUE;
  for (let i = start; i < end; ) {
    let offset = i + 1;
    while (offset < end && s[offset] === char) {
      offset++;
    }
    const leftCut = cut(s, start, offset - 1, memo);
    const rightCut = cut(s, offset, end, memo);
    if (minCutTimes > rightCut + leftCut) {
      minCutTimes = rightCut + leftCut;
    }
    i = offset;
    char = s[offset];
  }
  memo[start][end] = minCutTimes + 1;
  return memo[start][end];
}

export function minCut(s: string): number {
  const memo: number[][] = Array.from({
    length: s.length,
  }).map((v) => {
    return Array.from({
      length: s.length,
    }).fill(-1);
  }) as number[][];
  return cut(s, 0, s.length - 1, memo);
}
