export function strWithout3a3b(a: number, b: number): string {
  let countA = a;
  let countB = b;
  const res: string[] = [];
  let turnA = true;
  while (countA >= 2 && countB >= 2) {
    if (turnA) {
      res.push("a");
      res.push("");
      res.push("a");
      turnA = false;
      countA -= 2;
    } else {
      res.push("b");
      res.push("");
      res.push("b");
      turnA = true;
      countB -= 2;
    }
  }
  return res.join("");
}
