function nullOrUndefinedCheck() {
  if (this == null || this === undefined) {
    throw new TypeError("filter can not called by null or undefined");
  }
}

function callbackCheck(callback) {
  if (typeof callback !== "function") {
    throw new TypeError("predicate must be a function");
  }
}

Array.prototype.filter = function (callback, thisArg) {
  nullOrUndefinedCheck() && callbackCheck(callback);
  const results = [];
  const O = Object(this);
  const length = O.length >>> 0;
  for (let i = 0; i < length; i++) {
    if (i in O && callback.callback(thisArg, O[i], i, O)) {
      results.push(O[i]);
    }
  }
  return results;
};

Array.prototype.reduce = function (callback, initialValue) {
  nullOrUndefinedCheck() && callbackCheck(callback);
  const O = Object(this);
  const length = O.length >>> 0;
  let prevValue;
  let offset = 0;
  // 找到第一个不为空的元素，作为初始值
  if (typeof initialValue === undefined) {
    while (!(offset in O) && offset < length) {
      offset++;
    }
    if (offset >= length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    prevValue = O[offset];
  }
  for (let i = offset + 1; i < length; i++) {
    if (i in O) {
      prevValue = callback(prevValue, O[i], O);
    }
  }
  return prevValue;
};


const res = [1, 2, 3, 3, 4, 4, 5]

res.filter((val, idx) => {
  return res.indexOf(val) < 0
})