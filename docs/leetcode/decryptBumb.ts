export function decrypt(code: number[], k: number): number[] {
  let len = code.length;
  const results: number[] = [];
  if (k === 0) {
    return code.map((v) => {
      return 0;
    });
  } else if (k > 0) {
    let sum = 0;
    for (let i = 0; i < k; i++) {
      sum += code[i];
    }
    let left = 0;
    for (let i = 0; i < code.length; i++) {
      let removeNum = code[left++];
      let pos = i + k;
      if (pos >= len) {
        pos -= len;
      }
      let insertNum = code[pos];
      sum -= removeNum;
      sum += insertNum;
      results[i] = sum;
    }
  } else {
    let sum = 0;
    let len = code.length;
    let D = Math.abs(k)
    for (let i = 0; i < D; i++) {
      sum += code[len - 1 - i];
    }
    let left = len - 1;
    for (let i = code.length - 1; i >= 0; i--) {
      let removeNum = code[left--];
      let pos = i - D;
      if (pos < 0) {
        pos += len;
      }
      let insertNum = code[pos];
      sum -= removeNum;
      sum += insertNum;
      results[i] = sum;
    }
  }
  return results;
}
