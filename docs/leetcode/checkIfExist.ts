export function checkIfExist(arr: number[]): boolean {
  const map: Map<
    number,
    {
      pos: number;
    }
  > = new Map();
  arr.forEach((v, idx) => {
    const val = v / 2;
    // 如果是整数
    if (Math.floor(val) === val) {
      map.set(val, {
        pos: idx,
      });
    }
  });
  return arr.some((v, idx) => {
    const meta = map.get(v);
    return meta && meta.pos !== idx;
  });
}
