export function findRadius(houses: number[], heaters: number[]): number {
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);
  // 供暖气指针
  let heatPointer = 0;
  let N = heaters.length;
  // 最终的距离
  let disRecord: number[] = [];
  for (let i = 0; i < houses.length; i++) {
    let D = Math.abs(heaters[heatPointer] - houses[i]);
    while (heatPointer + 1 < N) {
      let d = Math.abs(heaters[heatPointer + 1] - houses[i]);
      if (d > D) {
        break;
      }
      heatPointer++;
      D = d;
    }
    disRecord.push(D);
  }
  return Math.max(...disRecord);
}
