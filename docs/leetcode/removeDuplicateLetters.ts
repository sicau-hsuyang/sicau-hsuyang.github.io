export function removeDuplicateLetters(s: string): string {
  const monoStack: string[] = [];
  let res: string[] = [];
  let k = 0;
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    while (k && monoStack[k - 1].charCodeAt(0) > s.charCodeAt(i)) {
      monoStack.pop();
      k--;
    }
    if (res[0] === s[i]) {
      res.shift();
    }
    if (k === 0 || (k && monoStack[k - 1] !== s[i])) {
      monoStack.push(s[i]);
      k++;
      res.push(s[i]);
    }
  }
  return res.join("");
}
