export function calculate(s: string): number {
  s = s.replace(/\s/g, "");
  while (/\d+[\/\*]\d+/.test(s)) {
    s = s.replace(/\d+[\/\*]\d+/, (...matchResult: any[]) => {
      return Math.floor(eval(matchResult[0])).toString();
    });
  }
  return eval(s);
}
