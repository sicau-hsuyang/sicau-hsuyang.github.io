```js
const func = () => {
  console.log(0);

  setTimeout(() => {
    console.log(1);
  }, 1);

  setTimeout(() => {
    console.log(2);
  }, 0);

  new Promise((res) => {
    console.log(3);
    return res();
  }).then(() => {
    console.log(4);
  });

  setTimeout(() => {
    console.log(5);
    new Promise((res) => {
      console.log(6);
      return res();
    }).then((res) => {
      console.log(7);
    });
    console.log(8);
  });

  console.log(9);
};

func();
```

```js
setTimeout(function () {
  console.log(1);

  new Promise(function executor(resolve) {
    console.log(7);

    for (var i = 0; i < 10000; i++) {
      i === 9999 && resolve();
    }

    console.log(8);
  }).then(function () {
    console.log(9);
  });
}, 0);

setTimeout(function () {
  console.log(6);
}, 0);

new Promise(function executor(resolve) {
  console.log(2);

  for (var i = 0; i < 10000; i++) {
    i === 9999 && resolve();
  }

  console.log(3);
}).then(function () {
  console.log(4);
});

console.log(5);
```

```js
async function async1() {
  console.log("1");
  await async2();
  console.log("AAA");
}

async function async2() {
  console.log("3");
  return new Promise((resolve, reject) => {
    resolve();
    console.log("4");
  });
}

console.log("5");

setTimeout(() => {
  console.log("6");
}, 0);
// async1()
// await async1();

new Promise((resolve) => {
  console.log("7");
  resolve();
})
  .then(() => {
    console.log("8");
  })
  .then(() => {
    console.log("9");
  })
  .then(() => {
    console.log("10");
  });
console.log("11");
// 5 1 3 4 7 11 8 9 AAA 10 6
```

```js
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
```
