import { transform, digitToChinese } from "./money-transfer";

describe("money transfer unit test", () => {
  it("transform1", () => {
    const res = transform(9999);
  });

  it("transform2", () => {
    const res = transform(1028);
  });

  it("transform3", () => {
    const res = transform(9000);
  });

  it("transform3", () => {
    const res = transform(8010);
  });

  it("digit to chinese", () => {
    const res = digitToChinese(8942398423);
    const res2 = digitToChinese(89400008423);
    const res3 = digitToChinese(30000000);
    const res4 = digitToChinese(8200001000);
  });
});
