// import { debounce } from "lodash";
import { debounce } from "./debounce";

describe("lodash debounce test", () => {
  // it("debounce test", (done) => {
  //   let counter = 0;
  //   const fn = () => {
  //     counter++;
  //   };

  //   const enhancedFn = debounce(fn, 300, {
  //     leading: true,
  //   });

  //   enhancedFn();

  //   enhancedFn();

  //   expect(counter).toBe(1);

  //   setTimeout(() => {
  //     expect(counter).toBe(2);
  //     done();
  //   }, 1000);
  // });

  it("test time base debounce", (done) => {
    let counter = 0;
    const fn = () => {
      counter++;
    };
    const enhancedFn = debounce(fn, 300);
    enhancedFn();
    enhancedFn();
    enhancedFn();
    expect(counter).toBe(1);
  });
});
