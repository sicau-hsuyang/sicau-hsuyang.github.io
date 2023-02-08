const obj = {
  name: "aaa",
  age: 111,
  hobby: 333,
  [Symbol.iterator]() {
    let idx = 0;
    let values = Object.values(this);
    return {
      next() {
        return {
          value: values[idx++],
          done: idx == values.length,
        };
      },
    };
  },
};

for (const val of obj) {
  console.log(val);
}
