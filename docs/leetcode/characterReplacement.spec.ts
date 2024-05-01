import { characterReplacement } from "./characterReplacement";

describe("characterReplacement", () => {
  it("case 1", () => {
    const s = "ABAB",
      k = 2;
    const len = characterReplacement(s, k);
    expect(len).toBe(4);
  });

  it("case 2", () => {
    const s = "AABABBA",
      k = 1;
    const len = characterReplacement(s, k);
    expect(len).toBe(4);
  });

  it("case 3", () => {
    const s = "AABABBA",
      k = 0;
    const len = characterReplacement(s, k);
    expect(len).toBe(2);
  });

  it("case 4", () => {
    const s = "ABC",
      k = 1;
    const len = characterReplacement(s, k);
    expect(len).toBe(2);
  });

  it("case 5", () => {
    const s = "AABABBA",
      k = 2;
    const len = characterReplacement(s, k);
    expect(len).toBe(5);
  });

  it("case 6", () => {
    const s = "AABABBA",
      k = 3;
    const len = characterReplacement(s, k);
    expect(len).toBe(7);
  });

  it("case 7", () => {
    const s =
        "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF",
      k = 4;
    const len = characterReplacement(s, k);
    expect(len).toBe(7);
  });
});
