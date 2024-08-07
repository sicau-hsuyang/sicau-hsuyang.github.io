interface Struct {
  str: string;
  distance: number;
}

export function openLock(deadends: string[], target: string): number {
  let minDistance = Infinity;
  const deathSet = new Set(deadends);
  if (deathSet.has("0000")) {
    return -1;
  }
  const queue: Struct[] = [
    {
      str: "0000",
      distance: 0,
    },
  ];
  const usedSet: Set<string> = new Set();
  usedSet.add("0000");
  while (queue.length) {
    const { str, distance } = queue.shift()!;

    if (str === target && distance < minDistance) {
      minDistance = distance;
    }

    for (let i = 0; i < 4; i++) {
      const tmp = Number.parseInt(str[i]);
      const posRotate = tmp === 9 ? 0 : tmp + 1;
      const nagRotate = tmp === 0 ? 9 : tmp - 1;
      const str1 = str.substring(0, i) + posRotate + str.substring(i + 1);
      if (!deathSet.has(str1) && !usedSet.has(str1)) {
        queue.push({
          str: str1,
          distance: distance + 1,
        });
        usedSet.add(str1);
      }
      const str2 = str.substring(0, i) + nagRotate + str.substring(i + 1);
      if (!deathSet.has(str2) && !usedSet.has(str2)) {
        queue.push({
          str: str2,
          distance: distance + 1,
        });
        usedSet.add(str2);
      }
    }
  }
  return minDistance === Infinity ? -1 : minDistance;
}
