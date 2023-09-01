export function mergeSection(arr: number[]) {
  const results: string[] = [];
  let current: number[] = [];
  let offset = 0;
  while (offset < arr.length) {
    const num = arr[offset];
    if (current.length === 0) {
      current.push(num);
    } else {
      const lastNum = current[current.length - 1];
      if (lastNum + 1 === num) {
        current.push(num);
      } else {
        if (current.length === 1) {
          results.push(String(current[0]));
        } else {
          results.push(`${current[0]}->${current[current.length - 1]}`);
        }
        current = [num];
      }
    }
    offset++;
  }
  if (current.length) {
    if (current.length === 1) {
      results.push(String(current[0]));
    } else {
      results.push(`${current[0]}->${current[current.length - 1]}`);
    }
  }
  return results;
}
