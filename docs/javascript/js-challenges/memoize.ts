type Fn = (...params: any) => any;

export function memoize(fn: Fn): Fn {
  const map: Map<number, any[][]> = new Map();
  const valMap: Map<any[], any> = new Map();
  return function (...args: any[]) {
    const cache = isMatch(args, map);
    if (cache) {
      return valMap.get(cache);
    }
    const response = fn.apply(this, args);
    let arr: any[][] = [];
    if (!map.has(args.length)) {
      map.set(args.length, arr);
    } else {
      arr = map.get(args.length)!;
    }
    arr.push(args);
    valMap.set(args, response);
    return response;
  };
}

function isMatch(params: any[], map: Map<number, any[][]>) {
  const cache = map.get(params.length);
  if (!cache) {
    return null;
  }
  for (let i = 0; i < cache.length; i++) {
    const cachePass = cache[i];
    let detected = cachePass.every((val, idx) => {
      return val === params[idx];
    });
    if (detected) {
      return cachePass;
    }
  }
  return null;
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
