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
