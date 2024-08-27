Function.prototype.bind = function bind(ctx, ...args) {
  const bindKey = Symbol("bind");
  const context = ctx || window;
  context[bindKey] = this;
  return function bindFn() {
    const distArgs = [...args, ...arguments];
    if (this instanceof bindFn) {
      return new context[bindKey](...distArgs);
    }
    const res = context[bindKey](...distArgs);
    delete context[bindKey];
    return res;
  };
};
