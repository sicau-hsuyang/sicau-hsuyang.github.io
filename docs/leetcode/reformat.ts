export function reformat(s: string): string {
  let alphabeta: string[] = [];
  let digits: string[] = [];
  let results: string = "";
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (/\d/.test(char)) {
      alphabeta.push(char);
    }
    if (/[a-z]/.test(char)) {
      digits.push(char);
    }
  }
  if (Math.abs(alphabeta.length - digits.length) >= 2) {
    return "";
  }
  let set1!: string[];
  let set2!: string[];
  if (alphabeta.length > digits.length) {
    set1 = alphabeta;
    set2 = digits;
  } else {
    set2 = alphabeta;
    set1 = digits;
  }
  let str = "";
  while (set1.length) {
    const char1 = set1.pop() || "";
    const char2 = set2.pop() || "";
    str += char1 + char2;
  }
  return results;
}
/*
l1e2t3
*/
