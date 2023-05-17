export function minCostClimbingStairs(cost: number[]): number {
  let last = cost[0];
  let pre = cost[1];
  for (let i = 2; i < cost.length; i++) {
    let cur = cost[i];
    let now = Math.min(last + cur, pre);
    last = pre;
    pre = now;
  }
  return last;
}
