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
    expect(results.length).toBe(3);
    expect(results).toContainEqual([
      "John",
      "john00@mail.com",
      "john_newyork@mail.com",
      "johnsmith@mail.com",
    ]);
    expect(results).toContainEqual(["John", "johnnybravo@mail.com"]);
    expect(results).toContainEqual(["Mary", "mary@mail.com"]);
  });
});

test('二维数组包含特定子数组', () => {
  const received = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  const expectedSubarray = [4, 5, 6];

  expect(received).toContainEqual(expectedSubarray);
});
