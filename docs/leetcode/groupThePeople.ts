export function groupThePeople(groupSizes: number[]): number[][] {
  const map: Map<number, number[]> = new Map();
  groupSizes.forEach((num, idx) => {
    if (!map.has(num)) {
      map.set(num, []);
    }
    const collection: number[] = map.get(num)!;
    collection.push(idx);
  });
  const res: number[][] = [];
  const tmp = [...map.entries()];
  tmp.forEach(([prop, group]: [number, number[]]) => {
    if (prop == group.length) {
      res.push(group);
    } else {
      // 裂变
      let passGroup: number[] = [];
      while (group.length) {
        const el: number = group.pop()!;
        if (passGroup.length < prop) {
          passGroup.push(el);
        } else {
          res.push(passGroup);
          passGroup = [];
          passGroup.push(el);
        }
      }
      if (passGroup.length === prop) {
        res.push(passGroup);
      }
    }
  });
  return res;
}
