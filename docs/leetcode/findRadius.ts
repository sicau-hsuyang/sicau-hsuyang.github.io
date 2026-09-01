export function findRadius(houses: number[], heaters: number[]): number {
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);
  let headerPointer = 0;
  let len = heaters.length;
  let results: number[] = [];
  for (let i = 0; i < houses.length; i++) {
    let d = Math.abs(heaters[headerPointer] - houses[i]);
    while (headerPointer + 1 < len) {
      let tempD = Math.abs(heaters[headerPointer + 1] - houses[i]);
      if (tempD > d) {
        break;
      }
      headerPointer++;
      d = tempD;
    }
    results.push(d);
  }
  return Math.max(...results);
}
