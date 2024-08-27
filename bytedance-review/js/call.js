Function.prototype.myCall = function (ctx, ...args) {
  const context = ctx || window;
  const callKey = Symbol("call");
  context[callKey] = this;
  const res = ctx[callKey](...args);
  delete ctx[callKey];
  return res;
};
