export function countAndSay(n: number): string {
  let str: string = "1";
  for (let i = 2; i <= n; i++) {
    let result = "";
    for (let offset = 0; offset < str.length; ) {
      const char = str[offset];
      let k = offset + 1;
      let flag = false;
      while (k < str.length && str[k] === char) {
        k++;
        flag = true;
      }
      result += k - offset + "" + char;
      if (flag) {
        offset = k;
      } else {
        offset++;
      }
    }
    str = result;
  }
  return str;
}
