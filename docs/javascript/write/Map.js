function GenerateIterator(keys, values, selector) {
  const SentinelArray = [];

  const render = (key, value) => {
    return {
      key,
      value,
    };
  };

  class MyMapIterator {
    _index = -1;

    _keys = SentinelArray;

    _values = SentinelArray;

    _selector = render;

    [Symbol.iterator]() {
      return this;
    }

    constructor(keys, values, selector) {
      this._keys = keys;
      this._values = values;
      this._index = 0;
      this._selector = selector || render;
    }

    next() {
      var index = this._index;
      if (index >= 0 && index < this._keys.length) {
        var result = this._selector(this._keys[index], this._values[index]);
        if (index + 1 >= this._keys.length) {
          this.initIterator();
        } else {
          this._index++;
        }
        return { value: result, done: false };
      }
      return { value: undefined, done: true };
    }

    return(value) {
      if (this._index >= 0) {
        this.initIterator();
      }
      return {
        value,
        done: true,
      };
    }

    throw(reason) {
      if (this._index >= 0) {
        this.initIterator();
      }
      throw reason;
    }

    initIterator() {
      this._index = -1;
      this._keys = SentinelArray;
      this._values = SentinelArray;
      this._selector = render;
    }
  }

  return new MyMapIterator(keys, values, selector);
}

export function MyMap(iterator) {
  const SentinelKey = {};

  class MyMapImplement {
    cachedKey = SentinelKey;

    cachedKeyIdx = -1;

    // 存储keys
    storageKeys = [];
    // 存储值
    storageContents = [];

    [Symbol.iterator]() {
      return GenerateIterator(this.storageKeys, this.storageContents);
    }

    get size() {
      return this.storageKeys.length;
    }

    constructor(iterator) {
      // 如果有初始化参数，必须是一个迭代器
      const values =
        iterator && typeof iterator[Symbol.iterator] === "function"
          ? [...iterator]
          : [];
      values.length &&
        values.forEach(([key, value]) => {
          this.set(key, value);
        });
    }

    /**
     * 删除Map中的key
     * @param {any} key
     */
    delete(key) {
      // 命中缓存，直接返回缓存值
      const cacheIdx = this._getCache(key);
      // 如果命中缓存值，快速删除
      if (cacheIdx > -1) {
        // 删除key
        this.storageKeys.splice(cacheIdx, 1);
        // 删除val
        this.storageContents.splice(cacheIdx, 1);
        // 初始化缓存
        this._initCache();
        return true;
      } else {
        const idx = this._find(key);
        if (idx > -1) {
          // 删除key
          this.storageKeys.splice(idx, 1);
          // 删除val
          this.storageContents.splice(idx, 1);
        }
        return idx > -1;
      }
    }

    /**
     * 设置值
     * @param {any} key
     * @param {any} value
     * @returns { boolean }
     */
    set(key, value) {
      // 如果存在键值，更新
      if (this.has(key)) {
        const cachedKeyIdx = this.cachedKeyIdx;
        this.storageContents[cachedKeyIdx] = value;
        this.storageKeys[cachedKeyIdx] = key;
      } else {
        // 以最后一个作为缓存
        this.cachedKey = key;
        this.cachedKeyIdx = this.storageKeys.length;
        this.storageKeys.push(key);
        this.storageContents.push(value);
      }
    }

    /**
     * 检测Map中是否包含某个值
     * @param {any} key
     */
    has(key) {
      return this._find(key) > -1;
    }

    /**
     * 获取值
     * @param {any} key
     * @returns {any}
     */
    get(key) {
      // 命中缓存，直接返回缓存值
      const cacheIdx = this._getCache(key);
      if (cacheIdx > -1) {
        return this.cachedVal;
      }
      // 根据Key查找索引
      const idx = this._find(key);
      // 根据索引查找值
      const val = this.storageContents[idx];
      // 找得到，设置缓存
      if (idx > -1) {
        this.cachedKey = key;
        this.cachedKeyIdx = idx;
      }
      return val;
    }

    values() {
      return GenerateIterator(
        this.storageKeys,
        this.storageContents,
        (key, value) => {
          return value;
        }
      );
    }

    forEach(fn) {
      this.storageKeys.forEach((key, keyIdx) => {
        const val = this.storageContents[keyIdx];
        fn(key, val, this);
      });
    }

    entries() {
      return this[Symbol.iterator]();
    }

    keys() {
      return GenerateIterator(
        this.storageKeys,
        this.storageContents,
        (key, value) => {
          return key;
        }
      );
    }

    _initCache() {
      this.cachedKey = SentinelKey;
      this.cachedKeyIdx = -1;
    }

    _find(key) {
      return this.storageKeys.findIndex((v) => {
        return (Number.isNaN(v) && Number.isNaN(key)) || v === key;
      });
    }

    /**
     * 获取缓存，命中缓存返回 非负数，否则返回 -1
     * @param {any} key
     * @returns { number }
     */
    _getCache(key) {
      return (Number.isNaN(this.cachedKey) && Number.isNaN(key)) ||
        this.cachedKey === key
        ? this.cachedKeyIdx
        : -1;
    }

    clear() {
      this.storageKeys.length = 0;
      this.storageContents.length = 0;
      this._initCache();
    }
  }

  return new MyMapImplement(iterator);
}

const map = new MyMap();

map.set(1, 1);

map.set("1", 1);

map.set(null, 2);

map.set(NaN, 222);

map.set(undefined, undefined);

map.set(Symbol(1), null);

// TODO: 考虑一下Symbol？？？

map.set(undefined, 100);

map.set(() => {}, 800);

const s = Symbol(2);

map.set(s, Symbol(222));

console.log(map.get(s));

console.log(map.has(NaN));

map.get(undefined);

console.log(map.get(NaN));

map.delete(undefined);

const e = [...map.entries()];
console.log(e);

const val = [...map.keys()];
console.log(val);

console.log([...map.values()]);

map.forEach((key, value, map) => {
  console.log(key, value, map);
});
