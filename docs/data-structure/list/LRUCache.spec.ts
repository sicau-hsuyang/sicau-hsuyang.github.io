import { LRUCache } from './LRUCache'
describe('LRUCache', () => {
  let cache: LRUCache;

  beforeEach(() => {
    cache = new LRUCache(2);
  });

  describe('get', () => {
    it('returns -1 when the cache is empty', () => {
      expect(cache.get(1)).toBe(-1);
    });

    it('returns -1 when the key is not found in the cache', () => {
      cache.put(1, 1);
      expect(cache.get(2)).toBe(-1);
    });

    it('returns the value of the key when it is found in the cache', () => {
      cache.put(1, 1);
      cache.put(2, 2);
      expect(cache.get(1)).toBe(1);
      expect(cache.get(2)).toBe(2);
    });

    it('refreshes the node when the key is found in the cache', () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.get(1);
      cache.put(3, 3);
      expect(cache.get(2)).toBe(-1);
    });
  });

  describe('put', () => {
    it('adds a new node to the cache', () => {
      cache.put(1, 1);
      expect(cache.get(1)).toBe(1);
    });

    it('evicts the least recently used node when the cache is full', () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(3, 3);
      expect(cache.get(1)).toBe(-1);
      expect(cache.get(2)).toBe(2);
      expect(cache.get(3)).toBe(3);
    });

    it('updates the value of an existing node', () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(1, 3);
      expect(cache.get(1)).toBe(3);
      expect(cache.get(2)).toBe(2);
    });
  });
});
