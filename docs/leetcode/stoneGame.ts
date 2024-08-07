export function stoneGame(piles: number[]): boolean {
  // 总分
  const sumScore = piles.reduce((accumulate, score) => {
    return accumulate + score;
  });

  /**
   * 拿取最大分数
   * @param start 开始索引
   * @param end 结束索引
   * @param isAlice 是否该Alice拿取分数
   */
  const getScore = (
    stones: number[],
    start: number,
    end: number,
    isAlice: number,
    memo: number[][][]
  ) => {
    // 拿完了所有的石子
    if (start > end) {
      return 0;
    }
    // 只有最后一颗石子了
    if (start === end) {
      return !isAlice ? 0 : stones[start];
    }
    if (memo[start][end][isAlice] !== -1) {
      return memo[start][end][isAlice];
    }
    const nextTurn = isAlice === 0 ? 1 : 0;
    // 尝试从头拿一个石子
    const startScore = isAlice ? stones[start] : 0;
    const scorePlan1 =
      startScore + getScore(stones, start + 1, end, nextTurn, memo);
    const endScore = isAlice ? stones[end] : 0;
    const scorePlan2 =
      endScore + getScore(stones, start, end - 1, nextTurn, memo);
    const score = Math.max(scorePlan1, scorePlan2);
    memo[start][end][isAlice] = score;
    return score;
  };
  const memo: number[][][] = Array.from({
    length: piles.length,
  }).map((v) => {
    return Array.from({
      length: piles.length,
    }).map((v) => {
      return [-1, -1];
    });
  }) as number[][][];
  // 开始游戏
  const aliceScore = getScore(piles, 0, piles.length - 1, 1, memo);
  const bobScore = sumScore - aliceScore;
  return aliceScore > bobScore;
}
