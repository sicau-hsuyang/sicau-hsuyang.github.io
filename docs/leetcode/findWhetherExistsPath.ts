export function findWhetherExistsPath(
  n: number,
  graph: number[][],
  start: number,
  target: number
): boolean {
  const map: Map<number, Set<number>> = new Map();
  graph.forEach(([start, end]) => {
    let set = map.get(start);
    if (!set) {
      set = new Set();
      map.set(start, set);
    }
    set.add(end);
  });
  const queue: number[] = [start];
  const record: number[] = [];
  while (queue.length) {
    const num = queue.shift()!;
    if (record[num]) {
      continue;
    }
    record[num] = 1;
    if (num == target) {
      return true;
    }
    const nextSet = map.get(num);
    if (nextSet) {
      nextSet.forEach((nextNum) => {
        queue.push(nextNum);
      });
      nextSet.clear();
    }
  }
  return false;
}
