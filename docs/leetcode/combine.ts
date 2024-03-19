export function combine(n: number, k: number): number[][] {
  const results: number[][] = [];
  if (k === 1) {
    for (let i = 1; i <= n; i++) {
      results.push([i]);
    }
    return results;
  } else if (n === 1) {
    results.push([n]);
    return results;
  } else {
    const subResults = combine(n, k - 1);
    for (let d = 0; d < subResults.length; d++) {
      const record = subResults[d];
      const finalEl = record[record.length - 1];
      for (let i = finalEl + 1; i <= n; i++) {
        results.push([...record, i]);
      }
    }
    return results;
  }
}

/**
 n = 4, k = 2

 [1] -> [1, 2], [1, 3], [1, 4]
 [2] -> [2, 3], [2, 4]
 [3] -> [3, 4]
 [4] -> []

 n = 4, k =3
 [1] -> [1, 2], [1, 3], [1, 4]
 [2] -> [2, 3], [2, 4]
 [3] -> [3, 4]
 [4] -> []

 [1, 2] -> [1, 2, 3], [1, 2, 4]
 [1, 3] -> [1, 3, 4]
 [1, 4]
 [2, 3] -> [2, 3, 4]
 [2, 4]
 [3, 4]

 */
