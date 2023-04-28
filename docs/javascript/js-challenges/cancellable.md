编写一个名为`cancellable`的函数:

- 它接收一个生成器对象
- 返回一个包含两个值的数组，一个函数`cancel` 和一个`Promise`对象（我们叫它`α`）。
- `generator`每一步生成的值都是一个`Promise`（类似`async`函数的约定）
- `generator`在迭代的过程中，需要将上一步的值透传（也是类似`async`函数）
- 如果在`Generator`迭代完成之前调用了`cancel`函数，`cancel`函数将错误抛给`Generator`，错误信息：字符串 `"Cancelled"`
  如果错误被`Generator`内部捕获，则`Generator`正常迭代剩余步骤，否则，`α`拒绝并抛出该错误信息，并终止。
- `Generator`迭代完成时，`α`的值取`Generator`函数`return`的值，如果`Generator`抛出错误，则返回的`α`拒绝，错误信息为`Generator`抛出的错误。

```ts
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
      Promise.resolve(step.value).then(fn).catch(catchFn);
    };

    const catchFn = (errInfo: any) => {
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
```
