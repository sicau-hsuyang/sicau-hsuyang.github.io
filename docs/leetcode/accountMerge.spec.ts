import { accountsMerge } from "./accountMerge";

describe("account merge", () => {
  it("case 1", () => {
    const accounts = [
      ["John", "johnsmith@mail.com", "john00@mail.com"],
      ["John", "johnnybravo@mail.com"],
      ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
      ["Mary", "mary@mail.com"],
    ];
    const results = accountsMerge(accounts);
    expect(results).toEqual([
      [
        "John",
        "john00@mail.com",
        "john_newyork@mail.com",
        "johnsmith@mail.com",
      ],
      ["John", "johnnybravo@mail.com"],
      ["Mary", "mary@mail.com"],
    ]);
  });
});
