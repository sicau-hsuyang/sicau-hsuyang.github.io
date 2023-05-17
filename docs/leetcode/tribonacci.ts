export function tribonacci(n: number): number {
  let T0 = 0;
  let T1 = 1;
  let T2 = 1;
  if (n === 0) {
    return T0;
  } else if (n === 1) {
    return T1;
  } else if (n === 2) {
    return T2;
  } else {
    for (let i = 3; i <= n; i++) {
      let now = T0 + T1 + T2;
      T0 = T1;
      T1 = T2;
      T2 = now;
    }
    return T2;
  }
}
