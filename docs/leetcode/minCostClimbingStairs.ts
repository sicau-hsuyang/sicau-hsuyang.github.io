export function minCostClimbingStairs(cost: number[]): number {
  return myMinCost(cost, new Map());
}

function myMinCost(cost: number[], map: Map<number, number>): number {
  console.log(cost);
  let len = cost.length;
  if (len < 2) {
    return 0;
  } else if (len == 2) {
    return Math.min(...cost);
  } else {
    let leftArr = cost.slice(1);
    let leftVal = Infinity;
    if (map.get(leftArr.length)) {
      leftVal = map.get(leftArr.length) as number;
    } else {
      leftVal = myMinCost(leftArr, map);
    }
    map.set(leftArr.length, leftVal);
    const leftCost = cost[0] + leftVal;
    const rightArr = cost.slice(2);
    let rightVal = Infinity;
    if (map.get(rightArr.length)) {
      rightVal = map.get(rightArr.length) as number;
    } else {
      rightVal = myMinCost(rightArr, map);
    }
    const rightCost = cost[1] + rightVal;
    return Math.min(leftCost, rightCost);
  }
}
