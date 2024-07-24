function permutation(arr: string[], offset = 0): string[] {
  if (offset === arr.length - 1) {
    return [arr[arr.length - 1]];
  }
  const num = arr[offset];
  const res: string[] = [];
  const subsets = permutation(arr, offset + 1);
  for (let k = 0; k < subsets.length; k++) {
    for (let t = 0; t <= subsets[k].length; t++) {
      const left = subsets[k].slice(0, t);
      const right = subsets[k].slice(t);
      const temp = left + num + right;
      res.push(temp);
    }
  }
  return res;
}

export function getPermutation(n: number, k: number): string {
  const arr: string[] = [];
  for (let i = 1; i <= n; i++) {
    arr.push(String(i));
  }
  const res = permutation(arr);
  res.sort((a, b) => {
    // @ts-ignore
    return a - b;
  });

  return res[k - 1];
}

/**
 

 5 

 45
 54

 345 
 435
 453

 */