export function isPathCrossing(path: string): boolean {
  // 表示X
  const map: Map<number, object> = new Map();
  map.set(0, { 0: 1 });
  const current = [0, 0];
  return path.split("").some((direction) => {
    switch (direction) {
      case "N":
        current[1]++;
        break;
      case "E":
        current[0]++;
        break;
      case "S":
        current[1]--;
        break;
      case "W":
        current[0]--;
        break;
    }
    if (!map.get(current[0])) {
      map.set(current[0], {
        [current[1]]: 1,
      });
    } else {
      const obj = map.get(current[0])!;
      if (obj[current[1]] === 1) {
        return true;
      }
      obj[current[1]] = 1;
    }
    return false;
  });
}
