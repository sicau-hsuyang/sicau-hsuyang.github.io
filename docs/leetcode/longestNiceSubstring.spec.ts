import { longestNiceSubstring } from "./longestNiceSubstring";

describe("longestNiceSubstring", () => {
  it("case 1", () => {
    const s = "YazaAay";
    const res = longestNiceSubstring(s);
    expect(res).toBe("aAa");
  });

  it("case 2", () => {
    const s = "Bb";
    const res = longestNiceSubstring(s);
    expect(res).toBe("Bb");
  });

  it("case 3", () => {
    const s = "c";
    const res = longestNiceSubstring(s);
    expect(res).toBe("");
  });

  it("case 4", () => {
    const s = "dDzeE";
    const res = longestNiceSubstring(s);
    expect(res).toBe("dD");
  });

  it("case 5", () => {
    const s = "dddd";
    const res = longestNiceSubstring(s);
    expect(res).toBe("");
  });

  it("case 6", () => {
    const s = "cChH";
    const res = longestNiceSubstring(s);
    expect(res).toBe("cChH");
  });

  it("case 7", () => {
    const s = "BebjJE"
    const res = longestNiceSubstring(s);
    expect(res).toBe("BebjJE");
  })

  it("case 8", () => {
    const s = 'jceWzKNUrLQvxRyljvkUwCUymYuyAMAJLVaFfQfn'
    const res = longestNiceSubstring(s);
    expect(res).toBe("Ff");
  })
});
