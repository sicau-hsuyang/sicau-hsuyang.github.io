export function reconstructQueue(people: number[][]): number[][] {
  people.sort((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });
  const res: number[][] = [];
  let i = 0;
  // 先处理前面没有更高的人
  while (people[i][1] === 0) {
    res.push(people[i]);
    i++;
  }
  return [];
}
