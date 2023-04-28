function isObj(o: any) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

function areDeeplyEqual(o1: any, o2: any): boolean {
  if (Array.isArray(o1) && Array.isArray(o2)) {
    return (
      o1.length === o2.length &&
      o1.every((val, idx) => {
        return areDeeplyEqual(val, o2[idx]);
      })
    );
  } else if (isObj(o1) && isObj(o2)) {
    let isDeepEqual = true;
    for (const key in o1) {
      if (!areDeeplyEqual(o1[key], o2[key])) {
        isDeepEqual = false;
      }
    }
    return isDeepEqual;
  } else {
    return o1 === o2;
  }
}
