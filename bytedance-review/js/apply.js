Function.prototype.myApply = function apply(ctx, args = []) {
  const context = ctx || window;
  const applyKey = Symbol("apply");
  context[applyKey] = this;
  const res = context[applyKey](...args);
  delete context[applyKey];
  return res;
};
