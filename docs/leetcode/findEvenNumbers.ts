function findNum(map: Record<number, number>, offset = 0): number[] {
  if (offset === 2) {
    return Object.entries(map)
      .filter(([prop, count]) => {
        return count > 0 && Number.parseInt(prop) !== 0;
      })
      .map(([prop]) => {
        return Number.parseInt(prop) * 100;
      });
  } else {
    const res: number[] = [];
    for (const key in map) {
      if (map[key] > 0) {
        if ((offset === 0 && Number.parseInt(key) % 2 === 0) || offset != 0) {
          map[key]--;
          const subRes = findNum(map, offset + 1);
          subRes.forEach((sub) => {
            res.push(sub + Number.parseInt(key) * 10 ** offset);
          });
          map[key]++;
        }
      }
    }
    return res;
  }
}

export function findEvenNumbers(digits: number[]): number[] {
  const map: Record<number, number> = {};
  for (let i = 0; i < digits.length; i++) {
    const cnt = map[digits[i]] || 0;
    if (cnt === 0) {
      map[digits[i]] = 1;
    } else {
      map[digits[i]] = cnt + 1;
    }
  }
  const res = findNum(map, 0);
  res.sort()
  return res;
}
