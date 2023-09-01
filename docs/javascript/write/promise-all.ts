async function promiseAll<T>(functions: (() => Promise<T>)[]): Promise<T[]> {
  let count = 0;
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    for (let i = 0; i < functions.length; i++) {
      const p = functions[i];
      p()
        .then((res) => {
          results[i] = res;
          count++;
          if (count === functions.length) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });
}

// [
//   () => new Promise((resolve) => setTimeout(() => resolve(4), 50)),
//   () => new Promise((resolve) => setTimeout(() => resolve(10), 150)),
//   () => new Promise((resolve) => setTimeout(() => resolve(16), 100)),
// ];
