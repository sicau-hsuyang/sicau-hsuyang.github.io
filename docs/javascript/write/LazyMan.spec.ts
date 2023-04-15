import { LazyMan } from "./LazyMan";

describe("lazy man", () => {
  it("case 1", (done) => {
    const man = new LazyMan("Tony");
    man.setFinish(done);
    man.sleep(10).eat("lunch");
  }, 100000);

  it("case 2", (done) => {
    const man = new LazyMan("Tony");
    man.setFinish(done);
    man.eat("lunch").sleep(10).eat("dinner");
  }, 100000);

  it("case 3", (done) => {
    const man = new LazyMan("Tony");
    man.setFinish(done);
    man.eat("lunch").eat("dinner").sleepFirst(5).sleep(10).eat("junk food");
  }, 100000);
});
