export function minimumRounds(tasks: number[]): number {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const count = map.get(task) || 0;
    if (count === 0) {
      map.set(task, 1);
    } else {
      map.set(task, count + 1);
    }
  }
  let total = 0;
  for (const totalTask of map.values()) {
    if (totalTask <= 1) {
      return -1;
    } else if (totalTask === 2 || totalTask === 3) {
      total += 1;
    } else if (totalTask === 4) {
      total += 2;
    } else {
      const dp: number[] = [];
      dp[2] = 1;
      dp[3] = 1;
      dp[4] = 2;
      for (let i = 5; i <= totalTask; i++) {
        if (dp[i - 2] && dp[i - 3]) {
          dp[i] = Math.min(dp[i - 2], dp[i - 3]) + 1;
        } else if (dp[i - 2]) {
          dp[i] = dp[i - 2] + 1;
        } else if (dp[i - 3]) {
          dp[i] = dp[i - 3] + 1;
        } else {
        }
      }
      if (dp[totalTask]) {
        total += dp[totalTask];
      } else {
        return -1;
      }
    }
  }
  return total;
}
