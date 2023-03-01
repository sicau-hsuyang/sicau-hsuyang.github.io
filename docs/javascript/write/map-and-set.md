## Map

`ES6`的`Map`相比于`ES5`以前使用对象做`哈希映射`，功能要强大的多。

使用对象做`哈希`有一个天生的劣势，只能支持`String`类型的`Key`(`ES6`以后，可以支持`Symbol`类型的`Key`)，如果传入的数据不是`String`类型，会被强制转换成`String`，在有些时候就比较鸡肋了，所以使用`Map`是最好的选择。

使用`ES5`实现`Map`就只能使用数组来进行存储，需要维持`Map`的`Key`列表和`Value`列表关心，在每次查找的过程中，通过数组方法的`全等比较`，同时，还要注意`NaN`这个特殊类型的处理（在`ES6`中，多次向`Map`添加`Key`为`NaN`的值，仅会视为一条记录）。

需要注意的点是，如果实现过程中需要用`缓存Key`来提高使用效率的话，因为`Map`键的特殊性，必须要使用一个内部的哨兵对象来初始化它的值，不能使用`null`，也不能使用`undefined`。

最后，只需要按照规格实现`Map`的迭代器即可。

以下是一个`ES6`环境下`Map`的实现，但是因为`Symbol`的唯一值特性，所以无法支持使用`Symbol`作为`Key`的场景。

```js
const map = new MyMap();
const s = Symbol("map");
map.set(s, "hello world");
map.get(s); // undefined
```

主要原因就是在比较`Key`的时候，`Symbol`既无法像普通对象那样比较地址，也无法像基础类型变量那样比较值，所导致的。

```js
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

function MyMap(iterator) {
  const SentinelKey = {};

  class MyMapImplement {
    cachedKey = SentinelKey;

    cachedKeyIdx = -1;

    // 存储keys
    storageKeys = [];
    // 存储值
    storageContents = [];

    // 需要为Map对象部署一个迭代器
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

    /**
     * 返回Map对象上所有的值，返回类型为迭代器
     */
    values() {
      return GenerateIterator(
        this.storageKeys,
        this.storageContents,
        (key, value) => {
          return value;
        }
      );
    }

    /**
     * 传入回调函数，以遍历Map对象上的Key-Value
     */
    forEach(fn) {
      this.storageKeys.forEach((key, keyIdx) => {
        const val = this.storageContents[keyIdx];
        fn(key, val, this);
      });
    }

    /**
     * 返回Map的所有Key-Value，返回类型是一个迭代器，和Map自身的迭代器是同一个东西
     */
    entries() {
      return this[Symbol.iterator]();
    }

    /**
     * 返回Map的所有键，返回类型是一个迭代器
     */
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
        // 因为某个Symbol值只能在同一个变量持有它的情况下才能比较，而find方法内部无法完成这样的操作的
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
```

## Set

如果实现了`Map`，那么实现`Set`就是手到擒来了。因为`Set`是一个特殊的`Map`，它的`Key`和`Value`是同一个。

之所以数组去重能够使用`Set`实现，其本质就是因为`Map`保证了`键`的唯一性。

```js
const set = new Set([1, 1, 2, 3, "1"]);
const res = [...set]; // 1，2，3，'1'
```

比如以下情况不能实现去重，因为不是用同一个变量引用的对象，就是三个对象，Map 就会创建多条记录，也就无法完成去重了。

```js
const set = new Set([{}, {}, {}]);
const res = [...set]; // {}，{}，{}
```

以下是`Set`的实现：

```js
import { MyMap } from "./Map";

class MySet {
  _map = new MyMap();

  get size() {
    return this._map.size;
  }

  [Symbol.iterator]() {
    return this._map.values();
  }

  constructor(iterator) {
    const arr = [...iterator];
    arr.length &&
      arr.forEach((val) => {
        this._map.set(val, val);
      });
  }

  keys() {
    return this._map.keys();
  }

  values() {
    return this._map.values();
  }

  entries() {
    return this._map.entries();
  }

  add(val) {
    return this._map.set(val, val);
  }

  delete(val) {
    return this._map.delete(val);
  }

  has(key) {
    return this._map.has(key);
  }

  forEach(fn) {
    this._map.forEach(fn);
  }

  clear() {
    this._map.clear();
  }
}
```
