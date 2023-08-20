import { eventLoopThrottle } from "./loop-throttle";

describe("event loop throttle", () => {
  it("series promise", () => {
    const fn = () => {
      console.log(111);
    };

    const newFn = eventLoopThrottle(fn);

    Promise.resolve().then(newFn).then(newFn).then(newFn)
  });

  it("sync task", () => {
    const fn = () => {
      console.log(111);
    };

    const newFn = eventLoopThrottle(fn);
    newFn();
    newFn();
  })
});
