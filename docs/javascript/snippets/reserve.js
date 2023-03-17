function reserve(num, length, pad = false) {
  if (typeof num !== "number") {
    throw new TypeError("parameter type error");
  }
  if (Number.isNaN(num)) {
    return num;
  }
  // 如果入参是整数，并且不要求填充位数
  if (!pad) {
    // 整数直接返回
    if (num === Math.floor(num)) {
      return num;
    } else {
      String("");
    }
  } else {
  }
}

function currying(fn, ...outerArgs) {
  return function (...args) {
    const combinedArgs = [...outerArgs, ...args];
    if (fn.length === combinedArgs.length) {
      return fn.apply(this, combinedArgs);
    } else {
      return currying(fn, ...combinedArgs);
    }
  };
}
