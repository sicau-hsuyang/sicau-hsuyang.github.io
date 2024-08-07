export function buildArray(target: number[], n: number): string[] {
  const res: string[] = [];
  let start = 1;
  for (let i = 0; i < target.length; ) {
    const num = target[i];
    if (start === num) {
      res.push("Push");
      i++;
    } else {
      res.push("Push");
      res.push("Pop");
    }
    start++;
  }
  return res;
}
