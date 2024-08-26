// function _isPalindrome(
//   s: string,
//   i: number,
//   j: number,
//   min: number,
//   max: number
// ) {
//   let start = i;
//   let end = j;
//   while (start >= min && end <= max) {
//     if (s[start] !== s[end]) {
//       return false;
//     }
//     start--;
//     end++;
//   }
//   return true;
// }

// function isPalindrome(s: string, start: number, end: number) {
//   let len = end - start + 1;
//   const mid = Math.floor((start + end) / 2);
//   if (len % 2 === 0) {
//     return _isPalindrome(s, mid, mid + 1, start, end);
//   } else {
//     return _isPalindrome(s, mid, mid, start, end);
//   }
// }

// export function partition(
//   s: string,
//   start: number = 0,
//   end: number = s.length - 1,
//   cache: Map<string, string[][]> = new Map()
// ): string[][] {
//   let res: string[][] = [];
//   if (start > end) {
//     return [];
//   }
//   const str = s.substring(start, end + 1);
//   if (cache.has(str)) {
//     console.log("命中缓存", str);
//     return cache.get(str)!;
//   }
//   // if (end === start) {
//   //   cache.set(str, [[s.substring(start, end + 1)]]);
//   //   return cache[start][end];
//   // }
//   for (let i = start; i <= end; i++) {
//     if (isPalindrome(s, start, i)) {
//       const cur = s.substring(start, i + 1);
//       const nextRes = partition(s, i + 1, end, cache);
//       const mergePass = nextRes.reduce((accu: string[][], item) => {
//         return [...accu, [cur, ...item]];
//       }, []);
//       res = res.concat(mergePass);
//     }
//   }
//   if (isPalindrome(s, start, end)) {
//     res.push([s.substring(start, end + 1)]);
//   }
//   cache.set(str, res);
//   return res;
// }

function _isPalindrome(
  s: string,
  i: number,
  j: number,
  min: number,
  max: number
) {
  let start = i;
  let end = j;
  let res: { start: number; end: number }[] = [];
  while (start >= min && end <= max) {
    if (s[start] !== s[end]) {
      break;
    }
    res[0]= {
      start,
      end,
    };
    start--;
    end++;
  }
  return res;
}

function isPalindrome(s: string, start: number, end: number) {
  let len = end - start + 1;
  const mid = Math.floor((start + end) / 2);
  if (len % 2 === 0) {
    return _isPalindrome(s, mid, mid + 1, start, end);
  } else {
    return _isPalindrome(s, mid, mid, start, end);
  }
}

export function partition(
  s: string,
  map: Map<string, string[][]> = new Map()
): string[][] {
  if (map.has(s)) {
    return map.get(s)!;
  }
  let res: string[][] = [];

  const fn = (record: { start: number; end: number }[]) => {
    let results: string[][] = [];
    record.forEach(({ start, end }) => {
      // 1个回文，肯定是不考虑的
      if (start !== end) {
        const leftStr = s.substring(0, start);
        const before = leftStr.split("");
        map.set(leftStr, [before]);
        const tempStr = s.substring(start, end + 1);
        console.log(tempStr);
        const remainStr = s.substring(end + 1);
        const rightRes = partition(remainStr, map);
        if (remainStr) {
          rightRes.forEach((arr) => {
            results.push([...before, tempStr, ...arr]);
          });
        } else {
          results.push([...before, tempStr]);
        }
      }
    });
    return results;
  };

  for (let i = 0; i < s.length; i++) {
    const plan1 = _isPalindrome(s, i, i + 1, 0, s.length);
    if (plan1.length) {
      res = res.concat(fn(plan1));
    }
    const plan2 = _isPalindrome(s, i, i, 0, s.length);
    if (plan2.length) {
      res = res.concat(fn(plan2));
    }
  }
  res.push(s.split(""));
  map.set(s, res);
  return res;
}
