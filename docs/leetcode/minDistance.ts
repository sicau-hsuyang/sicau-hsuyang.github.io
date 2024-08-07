function minDistance(word1: string, word2: string): number {
  const dp: number[][] = Array.from({
    length: word1.length,
  }).map((v) => {
    return [];
  }) as number[][];
  for (let i = 0; i < word1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j < word2.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word2.length; j++) {
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        const insert = dp[i - 1][j];
        const remove = dp[i][j - 1];
        const update = dp[i - 1][j - 1];
        // 增加一次操作次数
        dp[i][j] = Math.min(insert, remove, update) + 1;
      }
    }
  }
}

function _minDistance(
  s1: string,
  s2: string,
  offset1: number,
  offset2: number,
  memo: number[][]
) {
  if (memo[offset1] && memo[offset1][offset2]) {
    return memo[offset1][offset2];
  }
  // 如果s1是空串，那么无论怎么样都要处理s2的length那么长的次数
  if (offset1 == 0) {
    memo[0][offset2] = offset2;
    return offset2;
  }
  // 反之亦然
  if (offset2 == 0) {
    memo[offset1][0] = offset1;
    return offset1;
  }
  // 如果相同的话，不用做什么操作，递归的求前面的距离
  if (s1[offset1 - 1] === s2[offset2 - 1]) {
    return _minDistance(s1, s2, offset1 - 1, offset2 - 1, memo);
  } else {
    // 将s2上插入一个使得当前最后一个字符跟s1相同，所以，递归的求s1的offset1-1和s2的offset2
    const insert = _minDistance(s1, s2, offset1 - 1, offset2, memo);
    // 将s2上删除一个使得当前最后一个字符跟s1相同，所以，递归的求s1的offset1和s2的offset2-1
    const remove = _minDistance(s1, s2, offset1, offset2 - 1, memo);
    // 将s1的字符串的最后一个字符替换成跟s2最后一个字符相同
    const update = _minDistance(s1, s2, offset1 - 1, offset2 - 1, memo);
    const distance = 1 + Math.min(insert, remove, update);
    memo[offset1][offset2] = distance;
    return distance;
  }
}

export function minDistance(s1: string, s2: string) {
  const memo = Array.from({
    length: s1.length + 1,
  }).map((v) => {
    return [];
  });
  return _minDistance(s1, s2, s1.length, s2.length, memo);
}
