export function F1(n: number) {
  if (n === 1 || n === 2) {
    return 1;
  } else {
    return F1(n - 1) + F1(n - 2);
  }
}

export function F2(n: number) {
  return _fibonacci(n, new Map());
}

function _fibonacci(n: number, map: Map<number, number>) {
  if (typeof map.get(n) !== "undefined") {
    return map.get(n);
  } else if (n === 1 || n === 2) {
    map.set(n, 1);
    return 1;
  } else {
    const last = _fibonacci(n - 1, map);
    // 注意，这个地方不能写到F(n - 2, map)后面，否则仍然会产生重复计算
    map.set(n - 1, last);
    const preLast = _fibonacci(n - 2, map);
    map.set(n - 2, preLast);
    return last + preLast;
  }
}

export function sum(n: number, acc: number = 0) {
  if (n === 0) {
    return acc;
  } else {
    return sum(n - 1, acc + n);
  }
}
