function a(input) {
  return new Promise((resolve) => {
    console.log("promise a", input);
    setTimeout(resolve, 1000, 1);
  });
}

function b(input) {
  return new Promise((resolve) => {
    console.log("promise b", input);
    setTimeout(resolve, 2000, 2);
  });
}

function c(input) {
  return new Promise((resolve) => {
    console.log("promise c", input);
    setTimeout(resolve, 3000, 3);
  });
}

// function d() {
//   return Promise.reject(new Error("timeout"));
// }

function* func() {
  const step1 = yield a();
  const step2 = yield b(step1);
  const step3 = yield c(step2);
  // yield d();
  console.log(step3);
  return 'hello world'
}

function isGenerator(o) {
  return o && o[Symbol.toStringTag] === "GeneratorFunction";
}

function spawn(gen) {
  if (!isGenerator(gen)) {
    return Promise.reject("parameter error");
  }
  return new Promise((resolve, reject) => {
    const ite = gen();
    function next(value, action) {
      let step = null;
      try {
        step = ite[action](value);
        if (step.done) {
          resolve(step.value);
          return;
        }
        Promise.resolve(step.value).then(
          (val) => {
            next(val, "next");
          },
          (error) => {
            next(error, "throw");
          }
        );
      } catch (exp) {
        reject(exp);
      }
    }
    next(undefined, "next");
  });
}

(async () => {
  const res = await spawn(func);
  console.log(res);
})();

