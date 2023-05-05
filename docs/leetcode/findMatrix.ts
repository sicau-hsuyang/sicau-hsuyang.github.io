export function findMatrix(nums: number[]): number[][] {
  const map = new Map();
  nums.forEach((num) => {
    let counter = map.get(num) || 0;
    counter++;
    map.set(num, counter);
  });
  const res: number[][] = [];
  while (map.size) {
    const group: number[] = [];
    const readyDel: number[] = [];
    const tmp = [...map.entries()];
    tmp.forEach(([num, size]) => {
      group.push(num);
      map.set(num, size - 1);
      if (size === 1) {
        readyDel.push(num);
      }
    });
    readyDel.forEach((num) => {
      map.delete(num);
    });
    res.push(group)
  }
  return res;
}
