// function currying(fn: (...args: any[]) => unknown, ...outerArgs: any[]) {
//   // 获取函数的参数长度
//   const length = fn.length;
//   return function inner() {
//     const innerArgs = [...arguments];
//     const combinedArgs = [...outerArgs, ...innerArgs];
//     // 如果达到了函数最终的参数个数
//     if (combinedArgs.length === length) {
//       return fn.apply(this, combinedArgs);
//     } else {
//       return currying(fn, ...combinedArgs);
//     }
//   };
// }

// // your answers
// declare function Currying<F>(fn: F): Curried<F>;
// type Curried<F> = F extends (args: never) => any
//   ? F
//   : F extends (...args: infer A) => infer R
//   ? A extends [infer First, ...infer Other]
//     ? (arg: First) => Curried<(...args: Other) => R>
//     : R
//   : never;

// function _add(a: number, b: number, c: number, d: number) {
//   return a + b + c + d;
// }

// const add = currying(_add);

// const add1 = add(1);

// console.log(add(1)(2, 3)(4)); // output: 10
// console.log(add1(3, 4)); // output: 10
// console.log(add(1)(2)(3)(4)); // output: 10

type Curry<T extends unknown[], R> = (
  args: T extends [infer A, ...infer Rest]
    ? Rest extends unknown[]
      ? Curry<Rest, R>
      : never
    : never
) => T extends [infer A, ...infer Rest] ? (arg: A) => Curry<Rest, R> : R;

function curry<T extends unknown[], R>(fn: (...args: T) => R): Curry<T, R> {
  return function curried(...args: T) {
    return args.length >= fn.length
      ? fn(...args)
      : (...rest: T) => curried(...args, ...rest);
  };
}

function add(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedAdd = curry(add);
const result = curriedAdd(1)(2)(3); // returns 6
