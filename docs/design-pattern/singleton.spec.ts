import { Singleton } from "./singleton";

describe("Singleton", () => {
  it("get instance should be equal", () => {
    const instance1 = Singleton.getInstance();
    const instance2 = Singleton.getInstance();
    expect(instance1).toBe(instance2);
  });
});
