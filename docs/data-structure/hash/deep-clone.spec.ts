import { deepClone } from "./deep-clone";
describe("deepClone", () => {
  it("should clone a simple object", () => {
    const obj = { a: 1, b: 2 };
    const cloneObj = deepClone(obj);
    expect(cloneObj).toEqual(obj);
    expect(cloneObj).not.toBe(obj);
  });

  it("should clone an object with nested objects", () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloneObj = deepClone(obj);
    expect(cloneObj).toEqual(obj);
    expect(cloneObj.b).toEqual(obj.b);
    expect(cloneObj.b).not.toBe(obj.b);
  });

  it("should clone an array with nested objects", () => {
    const obj = [1, { a: 2 }];
    const cloneObj = deepClone(obj);
    expect(cloneObj).toEqual(obj);
    expect(cloneObj[1]).toEqual(obj[1]);
    expect(cloneObj[1]).not.toBe(obj[1]);
  });

  it("should handle circular references", () => {
    const obj: any = { a: 1 };
    obj.b = obj;
    const cloneObj = deepClone(obj);
    expect(cloneObj).toEqual(obj);
    expect(cloneObj.b).toBe(cloneObj);
  });

  it("should handle complex circular references", () => {
    const obj1: any = { a: 1 };
    const obj2: any = { b: 2 };
    obj1.b = obj2;
    obj2.a = obj1;
    const cloneObj1 = deepClone(obj1);
    const cloneObj2 = cloneObj1.b;
    expect(cloneObj1).toEqual(obj1);
    expect(cloneObj2).toEqual(obj2);
    expect(cloneObj1.b).toBe(cloneObj2);
    expect(cloneObj2.a).toBe(cloneObj1);
  });
});
