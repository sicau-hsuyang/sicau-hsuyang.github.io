function create(o) {
  const obj = {};
  obj.__proto__ = o;
  return o;
}