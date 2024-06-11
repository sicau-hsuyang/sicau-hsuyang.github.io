import { trulyMostPopular } from "./trulyMostPopular";

describe("trulyMostPopular", () => {
  it("case 1", () => {
    const names = [
        "John(15)",
        "Jon(12)",
        "Chris(13)",
        "Kris(4)",
        "Christopher(19)",
      ],
      synonyms = [
        "(Jon,John)",
        "(John,Johnny)",
        "(Chris,Kris)",
        "(Chris,Christopher)",
      ];
    const val = trulyMostPopular(names, synonyms);
    expect(val).toEqual(["John(27)", "Chris(36)"]);
  });

  it("case 2", () => {
    const names = [
        "John(15)",
        "Jon(12)",
        "Joh(20)",
        "Chris(13)",
        "Kris(4)",
        "Christopher(19)",
      ],
      synonyms = [
        "(Jon,John)",
        "(John,Johnny)",
        "(Chris,Kris)",
        "(Chris,Christopher)",
        "(John,Joh)",
      ];
    const val = trulyMostPopular(names, synonyms);
    expect(val).toEqual(["Joh(47)", "Chris(36)"]);
  });

  it("case 3", () => {
    const names = [],
      synonyms = ["(a,b)", "(c,d)", "(b,c)"];
    const val = trulyMostPopular(names, synonyms);
    expect(val).toEqual(["a(23)"]);
  });
});
