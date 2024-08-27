function myInstanceOf(obj, constructor) {
  if (typeof obj !== "object" || typeof constructor !== "function") {
    return false;
  }
  let parent = obj.__proto__;
  while (parent && parent.constructor !== constructor) {
    parent = parent.__proto__;
  }
  return !!parent;
}
