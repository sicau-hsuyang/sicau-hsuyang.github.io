import { LFUCache } from "./LFUCache";

describe("LFUCache", () => {
  let cache: LFUCache;

  beforeEach(() => {
    cache = new LFUCache(3);
  });

  describe("get", () => {
    it("returns -1 if cache is empty", () => {
      expect(cache.get(1)).toBe(-1);
    });

    it("returns -1 if key is not found in cache", () => {
      cache.put(1, 1);
      expect(cache.get(2)).toBe(-1);
    });

    it("returns the value of the key if found in cache", () => {
      cache.put(1, 1);
      expect(cache.get(1)).toBe(1);
    });

    it("updates the weight of the data node", () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(3, 3);
      cache.get(1);
      cache.get(2);
      cache.put(4, 4);
      expect(cache.get(3)).toBe(-1);
    });
  });

  describe("put", () => {
    it("doesn't add data if capacity is zero", () => {
      expect(() => {
        new LFUCache(0);
      }).toThrow("the LRUCache capacity must bigger than zero");
    });

    it("adds data if capacity is not reached", () => {
      cache.put(1, 1);
      expect(cache.get(1)).toBe(1);
    });

    it("removes the least frequently used data if capacity is reached", () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(3, 3);
      cache.get(1);
      cache.get(2);
      cache.put(4, 4);
      expect(cache.get(1)).toBe(1);
      expect(cache.get(2)).toBe(2);
      expect(cache.get(3)).toBe(-1);
    });

    it("updates the weight of the data node", () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(3, 3);
      cache.get(1);
      cache.get(2);
      cache.put(4, 4);
      expect(cache.get(1)).toBe(1);
      expect(cache.get(2)).toBe(2);
      expect(cache.get(4)).toBe(4);
    });
  });

  describe("eject", () => {
    it("doesn't eject data if cache is empty", () => {
      const emptyCache = new LFUCache(0);
      emptyCache.eject();
      expect(emptyCache.get(1)).toBe(-1);
    });

    it("ejects the least frequently used data", () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(3, 3);
      cache.get(1);
      cache.get(2);
      cache.eject();
      expect(cache.get(3)).toBe(-1);
    });
  });
});
