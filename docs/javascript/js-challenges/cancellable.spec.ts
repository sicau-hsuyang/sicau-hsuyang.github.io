import { cancellable } from "./cancellable";
describe("cancellable all case test", () => {
  it("case 1", (done) => {
    function* generatorFunction() {
      return 42;
    }
    const [cancel, promise] = cancellable(generatorFunction());

    promise.then((val) => {
      expect(val).toBe(42);
      done();
    });

    setTimeout(() => {
      cancel();
    }, 100);
  });

  it("case 2", (done) => {
    function* generatorFunction() {
      const msg = yield new Promise((res) => res("Hello"));
      throw `Error: ${msg}`;
    }

    const [cancel, promise] = cancellable(generatorFunction());

    promise.catch((err) => {
      expect(err).toBe("Error: Hello");
      done();
    });
  });

  it("case 3", (done) => {
    function* generatorFunction() {
      yield new Promise((res) => setTimeout(res, 200));
      return "Success";
    }

    const [cancel, promise] = cancellable(generatorFunction());

    promise.catch((err) => {
      expect(err).toBe("Cancelled");
      done();
    });

    setTimeout(() => {
      cancel();
    }, 100);
  }, 10000);

  it("case 4", (done) => {
    function* generatorFunction() {
      let result = 0;
      yield new Promise((res) => setTimeout(res, 100));
      result += yield new Promise((res) => res(1));
      yield new Promise((res) => setTimeout(res, 100));
      result += yield new Promise((res) => res(1));
      return result;
    }

    const [cancel, promise] = cancellable(generatorFunction());

    promise.then((response) => {
      expect(response).toBe(2);
      done();
    });
  });

  it("case 5", (done) => {
    function* generatorFunction() {
      let result = 0;
      try {
        yield new Promise((res) => setTimeout(res, 100));
        result += yield new Promise((res) => res(1));
        yield new Promise((res) => setTimeout(res, 100));
        result += yield new Promise((res) => res(1));
      } catch (e) {
        return result;
      }
      return result;
    }

    const [cancel, promise] = cancellable(generatorFunction());

    promise.then((response) => {
      expect(response).toBe(1);
      done();
    });

    setTimeout(() => {
      cancel();
    }, 150);
  });

  it("case 6", (done) => {
    function* generatorFunction() {
      try {
        yield new Promise((resolve, reject) => reject("Promise Rejected"));
      } catch (e) {
        let a = yield new Promise((resolve) => resolve(2));
        let b = yield new Promise((resolve) => resolve(2));
        return a + b;
      }
    }

    const [cancel, promise] = cancellable(generatorFunction());

    promise.then((response) => {
      expect(response).toBe(4);
      done();
    });
  });

  it("case 7", (done) => {
    function* tasks() {
      const val = yield new Promise((resolve) => resolve(2 + 2));
      yield new Promise((resolve) => setTimeout(resolve, 100));
      return val + 1; // calculation shouldn't be done.
    }
    const [cancel, promise] = cancellable(tasks());
    setTimeout(cancel, 50);
    promise.catch((err) => {
      expect(err).toBe("Cancelled");
      done();
    });
  });

  it("case 8", (done) => {
    function* tasks() {
      try {
        yield new Promise((resolve, reject) => reject("Promise Rejected"));
      } catch (e) {
        try {
          yield new Promise((resolve, reject) => reject("Promise Rejected"));
        } catch (e) {
          let a = yield new Promise((resolve) => resolve(2));
          let b = yield new Promise((resolve) => resolve(2));
          return a + b;
        }
      }
      return "Hi";
    }

    const [cancel, promise] = cancellable(tasks());
    promise.then((val) => {
      expect(val).toBe(4);
      done();
    });
  });
});
