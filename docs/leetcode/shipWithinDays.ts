export function shipWithinDays(weights: number[], days: number): number {
  let maxWeight = 0;
  let sumWeight = 0;
  for (let i = 0; i < weights.length; i++) {
    sumWeight += weights[i];
    maxWeight = Math.max(maxWeight, weights[i]);
  }
  let rightWeight = sumWeight;
  let leftWeight = maxWeight;
  let midWeight = Math.floor((rightWeight + leftWeight) / 2);
  while (leftWeight <= rightWeight) {
    let costDay = days - 1;
    let tempSum = weights[0];
    // 运载能力超出了
    let isOverWeight = true;
    for (let i = 1; i < weights.length; i++) {
      if (tempSum + weights[i] <= midWeight) {
        tempSum += weights[i];
      } else if (costDay > 0) {
        // 还有运载能力，则开启新的一天
        tempSum = weights[i];
        costDay--;
      } else {
        // 运载能力不足，需要提高运载能力
        isOverWeight = false;
        break;
      }
    }
    if (isOverWeight) {
      rightWeight = midWeight - 1;
    } else {
      leftWeight = midWeight + 1;
    }
    midWeight = Math.floor((rightWeight + leftWeight) / 2);
  }
  return midWeight + 1;
}

/**

 求出货物的总质量，进而求出每天至少要运多少

 求出其中一件货物的最大质量

 min(单件的最大质量)
 max(总质量)

 */
