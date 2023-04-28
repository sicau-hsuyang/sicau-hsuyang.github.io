/**
 *
 * 

 有时候你会有一个长时间运行的任务，并且你可能希望在它完成之前取消它。为了实现这个目标，请你编写一个名为 cancellable 的函数，
 它接收一个生成器对象，并返回一个包含两个值的数组：一个 取消函数 和一个 promise 对象。

你可以假设生成器函数只会生成 promise 对象。

你的函数负责将 promise 对象解析的值传回生成器。
如果 promise 被拒绝，你的函数应将该错误抛回给生成器。

如果在生成器完成之前调用了取消回调函数，则你的函数应该将错误抛回给生成器。
该错误应该是字符串 "Cancelled"（而不是一个 Error 对象）。
如果错误被捕获，则返回的 promise 应该解析为下一个生成或返回的值。
否则，promise 应该被拒绝并抛出该错误。不应执行任何其他代码。

当生成器完成时，您的函数返回的 promise 应该解析为生成器返回的值。但是，如果生成器抛出错误，则返回的 promise 应该拒绝并抛出该错误。

 * 
 */

export function cancellable<T>(
  generator: Generator<Promise<any>, T, unknown>
): [() => void, Promise<T>] {
  let cancel;

  const p: Promise<T> = new Promise((resolve, reject) => {
    const fn = (val: any) => {
      const step = generator.next(val);
      if (step.done) {
        resolve(step.value);
        return;
      }
      Promise.resolve(step.value)
        .then((response) => {
          fn(response);
        })
        .catch(catchFn);
    };

    const catchFn = (errInfo) => {
      try {
        const catchStep = generator.throw(errInfo);
        if (catchStep.done) {
          resolve(catchStep.value);
        } else {
          Promise.resolve(catchStep.value).then(fn).catch(catchFn);
        }
      } catch (exp) {
        reject(exp);
      }
    };

    cancel = () => {
      try {
        const step = generator.throw("Cancelled");
        if (step.done) {
          return resolve(step.value);
        } else {
          Promise.resolve(step.value).then(fn);
        }
      } catch (exp) {
        reject(exp);
      }
    };
    fn(undefined);
  });
  return [cancel, p];
}

/**
 * function* tasks() {
 *   const val = yield new Promise(resolve => resolve(2 + 2));
 *   yield new Promise(resolve => setTimeout(resolve, 100));
 *   return val + 1;
 * }
 * const [cancel, promise] = cancellable(tasks());
 * setTimeout(cancel, 50);
 * promise.catch(console.log); // logs "Cancelled" at t=50ms
 */
