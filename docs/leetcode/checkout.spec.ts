import { Checkout } from "./checkout";

describe("Checkout", () => {
  it("case 1", () => {
    const action = ["Checkout", "add", "add", "get_max", "remove", "get_max"];
    const args = [[], [4], [7], [], [], []];
    const instance = new Checkout();
    for (let i = 1; i < action.length; i++) {
      instance[action[i]].apply(instance, args[i]);
    }
  });
});
