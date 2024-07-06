import { braceExpansionII } from "./braceExpansionII";

describe("braceExpansionII", () => {
  it("case 1", () => {
    const expression = "{a,b}{c,{d,e}}";
    braceExpansionII(expression);
  });

  it("case 2", () => {
    const expression = "{{a,z},a{b,c},{ab,z}}";
    braceExpansionII(expression);
  });

  it("case 3", () => {
    const expression = 'a{b,c}{d,e}f{g,h}'
    const re = braceExpansionII(expression);
    console.log(re)
  })
});
