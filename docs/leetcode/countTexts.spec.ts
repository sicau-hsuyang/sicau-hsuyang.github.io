import { countTexts } from "./countTexts";

describe("countTexts", () => {
  it("case 1", () => {
    const pressedKeys = "22233";
    const count = countTexts(pressedKeys);
    console.log(count);

    /**
    
     2 2233
     22 233
     222 33


     */
  });

  it("case 2", () => {
    const pressedKeys = "222222222222222222222222222222222222";
    const count = countTexts(pressedKeys);
    console.log(count);

    /**
    [[2, 33], [2, 3, 3], [23, 3]]
     3 3
     33

     2 3 3
     2 33 
     23 3

     

     */
  });
});
