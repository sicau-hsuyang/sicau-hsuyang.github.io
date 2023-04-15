import { ImageLoader } from "./ImageLoader";

describe("ImageLoader", () => {
  function Task(): Promise<string> {
    return new Promise((resolve, reject) => {
      const num = Math.random();
      if (num > 0.5) {
        resolve(String(num));
      } else {
        reject(new Error("test image load error"));
      }
    });
  }

  describe("addTask", () => {
    it("should increase totalTask count by 1", () => {
      const loader = new ImageLoader({});
      loader.addTask(Task);
      expect(loader["totalTask"]).toEqual(1);
    });

    it("should add the task to the taskQueue", () => {
      const loader = new ImageLoader({});
      loader.addTask(Task);
      expect(loader["taskQueue"]).toContain(Task);
    });

    it("should not add task if loader state is finish", () => {
      const loader = new ImageLoader({});
      loader["state"] = "finish";
      loader.addTask(Task);
      expect(loader["totalTask"]).toEqual(0);
      expect(loader["taskQueue"]).not.toContain(Task);
    });
  });

  describe("play", () => {
    it('should set loader state to "pending"', () => {
      const loader = new ImageLoader({});
      loader.play();
      expect(loader["state"]).toEqual("pending");
    });

    it("should start the task runner", () => {
      const loader = new ImageLoader({});
      loader["runTask"] = jest.fn();
      loader.play();
      expect(loader["runTask"]).toHaveBeenCalledTimes(1);
    });
  });

  describe("pause", () => {
    it('should set loader state to "pause"', () => {
      const loader = new ImageLoader({});
      loader.pause();
      expect(loader["state"]).toEqual("pause");
    });

    it('should emit "pause" event', () => {
      const loader = new ImageLoader({});
      const spy = jest.fn();
      loader.on("pause", spy);
      loader.pause();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("stop", () => {
    it("should reset loader state", () => {
      const loader = new ImageLoader({});
      loader["reset"] = jest.fn();
      loader.stop();
      expect(loader["reset"]).toHaveBeenCalledTimes(1);
    });

    it('should emit "stop" event', () => {
      const loader = new ImageLoader({});
      const spy = jest.fn();
      loader.on("stop", spy);
      loader.stop();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("setConfig", () => {
    it("should merge the provided config with the default config", () => {
      const loader = new ImageLoader({});
      loader.setConfig({ maxRetryCount: 5 });
      expect(loader["config"]).toEqual({ maxConcurrency: 5, maxRetryCount: 5 });
    });

    it("should not modify config if loader state is not idle", () => {
      const loader = new ImageLoader({});
      loader["state"] = "pending";
      loader.setConfig({ maxRetryCount: 5 });
      expect(loader["config"]).toEqual({
        maxConcurrency: 5,
        maxRetryCount: 10,
      });
    });
  });
});
