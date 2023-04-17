export function findContentChildren(g: number[], s: number[]): number {
  const map = new Map();
  let counter = 0;
  s.forEach((cookie) => {
    const size = map.get(cookie) || 0;
    if (size > 0) {
      map.set(cookie, size + 1);
    } else {
      map.set(cookie, 1);
    }
  });
  g.forEach((wantCookie) => {
    const remainCookie = map.get(wantCookie) || 0;
    if (remainCookie > 0) {
      counter++;
      map.set(wantCookie, remainCookie - 1);
    }
  });
  return counter;
}
