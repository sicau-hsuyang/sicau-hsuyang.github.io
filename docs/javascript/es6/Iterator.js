class MyIterator {
  [Symbol.iterator]() {
    return this;
  }

  arr = [1, 2, 3, 4, 5];

  idx = -1;

  constructor() {
    this.idx = 0;
  }

  next() {
    return {
      value: this.arr[this.idx++],
      done: this.idx === this.arr.length,
    };
  }

  return(val) {
    debugger;
    this.idx = -1;
  }

  throw(reason) {
    throw new Error(reason);
  }
}

const it = new MyIterator();

for (const i of it) {
  if (i === 3) {
    break;
  }
  console.log(i);
}
