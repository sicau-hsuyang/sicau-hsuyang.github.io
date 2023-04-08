function run(func) {
  let cache = [];
  let i = 0;
  const originalFetch = window.fetch;
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === "fulfilled") {
        return cache[i].data;
      } else if (cache[i].status === "rejected") {
        throw cache[i].err;
      }
    }
    const result = {
      status: "pending",
      data: null,
      err: null,
    };
    cache[i++] = result;
    const promise = originalFetch(...args)
      .then((resp) => resp.text())
      .then(
        (resp) => {
          result.status = "fulfilled";
          result.data = resp;
        },
        (err) => {
          result.status = "rejected";
          result.err = err;
        }
      );
    throw promise;
  };
  try {
    func();
  } catch (exp) {
    const reRun = () => {
      i = 0;
      func();
    };
    if (exp instanceof Promise) {
      exp.then(reRun, reRun);
    }
  }
}

function m3() {
  return fetch("https://www.baidu.com");
}

function main() {
  const resp = m3();
  console.log("\n\n\n\n\n\n\n\n");
  console.log(resp);
}

run(main);
