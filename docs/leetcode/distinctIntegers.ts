export function distinctIntegers(n: number): number {
  const set: Set<number> = new Set();
  let len = set.size;
  set.add(n);
  while (true) {
    for (let i = 1; i <= n; i++) {
      for (const val of set.values()) {
        if (val % i === 1) {
          set.add(i);
        }
      }
    }
    if (set.size === len) {
      break;
    }
    len = set.size;
  }
  return set.size;
}
