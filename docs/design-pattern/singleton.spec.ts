import { Singleton } from "./singleton";

describe("Singleton", () => {
  it("get instance should be equal", () => {
    const instance1 = Singleton.getInstance();
    const instance2 = Singleton.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("can not new constructor", () => {
    expect(() => {
      try {
        // @ts-ignore
        new Singleton();
      } catch (exp) {
        throw exp;
      }
    }).toThrowError();
  });
});
