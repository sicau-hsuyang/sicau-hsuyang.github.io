export function compactObject(obj: Array<unknown> | Object) {
  if (Array.isArray(obj)) {
    const newArray: unknown[] = [];
    for (let i = 0; i < obj.length; i++) {
      const v = obj[i];
      if (!isFalsy(v)) {
        if (isArrayOrObj(v)) {
          newArray.push(compactObject(v));
        } else {
          newArray.push(v);
        }
      }
    }
    return newArray;
  } else {
    const keys = Object.keys(obj);
    keys.forEach((prop) => {
      const val = obj[prop];
      if (isArrayOrObj(val)) {
        obj[prop] = compactObject(val);
      } else if (isFalsy(val)) {
        Reflect.deleteProperty(obj, prop);
      }
    });
    return obj;
  }
}

function isArrayOrObj(val: Array<unknown> | Object) {
  return (
    Array.isArray(val) ||
    Object.prototype.toString.call(val) === "[object Object]"
  );
}

function isFalsy(val: unknown) {
  return !val;
}
