function currying(fn: (...args: any[]) => unknown, ...outerArgs: any[]) {
  // 获取函数的参数长度
  const length = fn.length;
  return function inner() {
    const innerArgs = [...arguments];
    const combinedArgs = [...outerArgs, ...innerArgs];
    // 如果达到了函数最终的参数个数
    if (combinedArgs.length === length) {
      return fn.apply(this, combinedArgs);
    } else {
      return currying(fn, ...combinedArgs);
    }
  };
}

// your answers
declare function Currying<F>(fn: F): Curried<F>;
type Curried<F> = F extends (args: never) => any
  ? F
  : F extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Other]
    ? (arg: First) => Curried<(...args: Other) => R>
    : R
  : never;

function _add(a: number, b: number, c: number, d: number) {
  return a + b + c + d;
}

const add = currying(_add);

const add1 = add(1);

console.log(add(1)(2, 3)(4)); // output: 10
console.log(add1(3, 4)); // output: 10
console.log(add(1)(2)(3)(4)); // output: 10
