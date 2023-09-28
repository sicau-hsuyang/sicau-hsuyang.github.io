import { findAllRecipes } from "./findAllRecipes";

describe("findAllRecipes", () => {
  it("case 1", () => {
    const recipes = ["bread"],
      ingredients = [["yeast", "flour"]],
      supplies = ["yeast", "flour", "corn"];
    const results = findAllRecipes(recipes, ingredients, supplies);
    expect(results).toEqual(["bread"]);
  });

  it("case 2", () => {
    const recipes = ["bread", "sandwich"],
      ingredients = [
        ["yeast", "flour"],
        ["bread", "meat"],
      ],
      supplies = ["yeast", "flour", "meat"];
    const results = findAllRecipes(recipes, ingredients, supplies);
    expect(results).toEqual(["bread", "sandwich"]);
  });

  it("case 3", () => {
    const recipes = ["bread", "sandwich", "burger"],
      ingredients = [
        ["yeast", "flour"],
        ["bread", "meat"],
        ["sandwich", "meat", "bread"],
      ],
      supplies = ["yeast", "flour", "meat"];
    const results = findAllRecipes(recipes, ingredients, supplies);
    expect(results).toEqual(["bread", "sandwich", "burger"]);
  });

  it("case 4", () => {
    const recipes = ["bread"],
      ingredients = [["yeast", "flour"]],
      supplies = ["yeast"];
    const results = findAllRecipes(recipes, ingredients, supplies);
    expect(results).toEqual([]);
  });
});
