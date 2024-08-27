function currying(fn, args = []) {
  const sumOf = () => fn.apply(this, args);

  function curried() {
    const combinedArgs = [...args, ...arguments];
    return currying(fn, combinedArgs);
  }

  curried.sumOf = sumOf;

  return curried;
}

const sum = currying(function sum() {
  return [...arguments].reduce((accu, cur) => accu + cur, 0);
}, []);
