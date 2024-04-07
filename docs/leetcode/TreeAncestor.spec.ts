import { TreeAncestor } from "./TreeAncestor";

describe("TreeAncestor", () => {
  it("case 1", () => {
    const n = 7;
    const parent = [-1, 0, 0, 1, 1, 2, 2];
    const t = new TreeAncestor(n, parent);
    // const k1 = t.getKthAncestor(3, 1);
    // const k2 = t.getKthAncestor(5, 2);
    // const k3 = t.getKthAncestor(6, 3);
    // const k4 = t.getKthAncestor(6, 3);
    // const k5 = t.getKthAncestor(5, 2);
    // console.log(k1, k2, k3, k4, k5);
    const k1 = t.getKthAncestor(1, 1);
    const k2 = t.getKthAncestor(3, 2);
    console.log(k1, k2);
  });

  it("case 2", () => {
    const n = 50000;
    const parent = [-1, 0];
    for (let i = 1; i <= 49998; i++) {
      parent.push(i);
    }
    const t = new TreeAncestor(n, parent);
    debugger;
  });
});
