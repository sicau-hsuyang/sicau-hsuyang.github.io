import { normalHandCalc, sevenPairHandCalc } from "./Calculator";
import { Entity } from "./Entity";
import { groupBy } from "lodash";

function createHand(code: string) {
  const list = code.split("").map((v) => {
    const en = new Entity();
    en.size = +v;
    if (/\d/.test(v)) {
      en.size = +v;
      en.type = "万";
    } else if (/[a-z]/.test(v)) {
      en.size = v.charCodeAt(0) - 96;
      en.type = "条";
    } else {
      en.size = v.charCodeAt(0) - 64;
      en.type = "筒";
    }
    return en;
  });
  const group = Object.values(groupBy(list, (v) => v.type));
  return group;
}

describe("calc seven pairs", () => {
  it("1123344556677", () => {
    const hand = createHand("1123344556677");
    const target = sevenPairHandCalc(hand);
    expect(target).toBe(2);
  });

  it("1223344556677", () => {
    const hand = createHand("1223344556677");
    const idx = sevenPairHandCalc(hand);
    expect(idx).toBe(1);
  });

  it("1122334455667", () => {
    const hand = createHand("1122334455667");
    const idx = sevenPairHandCalc(hand);
    expect(idx).toBe(7);
  });

  it("1111223344557", () => {
    const hand = createHand("1111223344557");
    const idx = sevenPairHandCalc(hand);
    expect(idx).toBe(7);
  });

  it("1111222244557", () => {
    const hand = createHand("1111222244557");
    const idx = sevenPairHandCalc(hand);
    expect(idx).toBe(7);
  });

  it("1233445567788", () => {
    const list = "1233445567788".split("").map((v) => {
      const en = new Entity();
      en.size = +v;
      return en;
    });
    const idx = sevenPairHandCalc([list]);
    expect(idx).toBe(-1);
  });

  it("1A23344556677", () => {
    const list = "1A23344556677".split("").map((v) => {
      const en = new Entity();
      if (/\d/.test(v)) {
        en.size = +v;
        en.type = "万";
      } else {
        en.size = v.charCodeAt(0) - 64;
        en.type = "筒";
      }
      return en;
    });
    const idx = sevenPairHandCalc([list]);
    expect(idx).toBe(-1);
  });
});

describe("calc normal list", () => {
  it("case where is 122334BBCDEFG", () => {
    const hand = createHand("122334BBCDEFG");
    const results = normalHandCalc(hand);
    expect(results.length).toBe(3);
    expect(results[0].type).toBe("筒");
    expect(results[1].type).toBe("筒");
    expect(results[2].type).toBe("筒");
    expect(results[0].size).toBe(2);
    expect(results[1].size).toBe(5);
    expect(results[2].size).toBe(8);
  });

  it("case only 1", () => {
    const hand = createHand("1");
    const results = normalHandCalc(hand);
    expect(results.length).toBe(1);
    expect(results[0].type).toBe("万");
  });

  it("case normal case", () => {
    const hand = createHand("1114567");
    const results = normalHandCalc(hand);
    expect(results.length).toBe(2);
    expect(results[0].type).toBe("万");
    expect(results[1].type).toBe("万");
    expect(results[0].size).toBe(4);
    expect(results[1].size).toBe(7);
  });

  it("case two pair", () => {
    const hand = createHand("11AA");
    const results = normalHandCalc(hand);
    expect(results.length).toBe(2);
    expect(results[0].type).toBe("万");
    expect(results[1].type).toBe("筒");
    expect(results[0].size).toBe(1);
    expect(results[1].size).toBe(1);
  });

  it("case six target mahjong", () => {
    const hand = createHand("1112345678");
    const results = normalHandCalc(hand);
    expect(results.length).toBe(6);
    expect(results[0].type).toBe("万");
    expect(results[1].type).toBe("万");
    expect(results[2].type).toBe("万");
    expect(results[3].type).toBe("万");
    expect(results[4].type).toBe("万");
    expect(results[5].type).toBe("万");
    expect(results[0].size).toBe(2);
    expect(results[1].size).toBe(3);
    expect(results[2].size).toBe(5);
    expect(results[3].size).toBe(6);
    expect(results[4].size).toBe(8);
    expect(results[5].size).toBe(9);
  });

  it("case test clear three pattern is correct", () => {
    const hand = createHand("11123456AA");
    const results = normalHandCalc(hand);
    expect(results.length).toBe(4);
    expect(results[0].type).toBe("万");
    expect(results[1].type).toBe("万");
    expect(results[2].type).toBe("万");
    expect(results[3].type).toBe("筒");
    expect(results[0].size).toBe(1);
    expect(results[1].size).toBe(4);
    expect(results[2].size).toBe(7);
    expect(results[3].size).toBe(1);
  });

  it("case every target in some type", () => {
    const hand = createHand("1112345678999");
    const results = normalHandCalc(hand);
    expect(results.length).toBe(9);
    expect(results[0].type).toBe("万");
    expect(results[1].type).toBe("万");
    expect(results[2].type).toBe("万");
    expect(results[3].type).toBe("万");
    expect(results[4].type).toBe("万");
    expect(results[5].type).toBe("万");
    expect(results[6].type).toBe("万");
    expect(results[7].type).toBe("万");
    expect(results[8].type).toBe("万");
    expect(results[0].size).toBe(1);
    expect(results[1].size).toBe(2);
    expect(results[2].size).toBe(3);
    expect(results[3].size).toBe(4);
    expect(results[4].size).toBe(5);
    expect(results[5].size).toBe(6);
    expect(results[6].size).toBe(7);
    expect(results[7].size).toBe(8);
    expect(results[8].size).toBe(9);
  });
});
