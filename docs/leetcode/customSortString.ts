export function customSortString(order: string, s: string): string {
  const map = new Map();
  for (let i = 0; i < order.length; i++) {
    map.set(order[i], 10000 + (order.length - i));
  }
  const arr = s.split("").sort((a, b) => {
    const weightA = map.get(a) || a.charCodeAt(0);
    const weightB = map.get(b) || b.charCodeAt(0);
    return weightB - weightA;
  });
  return arr.join("");
}
