export function cancellable<T>(
  generator: Generator<Promise<any>, T, unknown>
): [() => void, Promise<T>] {
  let cancel: () => void = () => {};

  const p: Promise<T> = new Promise((resolve, reject) => {
    const spawn = (val: any) => {
      const step = generator.next(val);
      if (step.done) {
        resolve(step.value);
        return;
      }
      Promise.resolve(step.value).then(spawn).catch(catchFn);
    };

    const catchFn = (errInfo: any) => {
      try {
        const catchStep = generator.throw(errInfo);
        if (catchStep.done) {
          resolve(catchStep.value);
        } else {
          Promise.resolve(catchStep.value).then(spawn).catch(catchFn);
        }
      } catch (exp) {
        reject(exp);
      }
    };

    cancel = () => {
      catchFn("Cancelled");
    };
    spawn(undefined);
  });
  return [cancel, p];
}
