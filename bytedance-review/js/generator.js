function* createIterator(obj) {
  const values = Object.values(obj);
  for (let i = 0; i < values.length; i++) {
    yield values[i];
  }
}

const target = {
  a: 1,
  b: 2,
};

target[Symbol.iterator] = function () {
  // Iterator
  // return createIterator(this);
  const values = Object.values(this);
  let idx = 0;
  return {
    next() {
      return {
        value: values[idx++],
        done: idx > values.length,
      };
    },
    // return() {
    //   // 不需要处理什么逻辑
    // },
  };
};
