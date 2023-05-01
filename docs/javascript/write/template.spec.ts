import { render } from "./template";

describe("render test", () => {
  it("case 1", () => {
    const template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
    const data = {
      name: "姓名",
      age: 18,
    };
    const res = render(template, data);
    const expectRes = "我是姓名，年龄18，性别undefined";
    expect(res).toBe(expectRes);
  });

  it("case 2", () => {
    const template = "我是{{name}}}}，年龄{{{{age}}，性别{{sex}}";
    const data = {
      name: "姓名",
      age: 18,
    };
    const res = render(template, data);
    const expectRes = "我是姓名，年龄18，性别undefined";
    expect(res).toBe(expectRes);
  });
});
