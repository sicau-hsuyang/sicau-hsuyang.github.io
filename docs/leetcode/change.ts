function _change(amount: number, coins: number[]): number[][] {
  const res: number[][] = [];
  let cache: number[] = [];
  for (let i = 0; i < coins.length && coins[i] <= amount; i++) {
    const next = amount - coins[i];
    if (cache[coins[i]] || cache[next]) {
      continue;
    }
    cache[coins[i]] = 1;
    cache[next] = 1;
    if (next > 0) {
      const nextRes = _change(next, coins);
      nextRes.forEach((arr) => {
        res.push([coins[i], ...arr]);
      });
    } else if (next === 0) {
      res.push([coins[i]]);
    }
  }
  return res;
}

// function _change(amount: number, coins: number[]): number {
//   let total = 0;
//   for (let i = 0; i < coins.length && coins[i] <= amount; i++) {
//     const next = amount - coins[i];
//     if (next > 0) {
//       const count = _change(next, coins);
//       total += count;
//     } else if (next === 0) {
//       total++;
//     }
//   }
//   return total;
// }

export function change(amount: number, coins: number[]): number[][] {
  coins.sort((a, b) => a - b);
  return _change(amount, coins);
}

/**
 5 5
 5 2 + 3
 5 1 + 4 

 2 2
   1+ 1

 3 1+1+1
 3 2 + 1
 
 
 4 2+2 -> 1+1 + 2; 1+1 +1 + 1
   1+3 -> 1 + 1+2 ; 1+ 1+1;


 */
