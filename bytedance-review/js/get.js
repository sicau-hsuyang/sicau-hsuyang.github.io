function normalizeKeys(key) {
  let startFlag = false;
  let tempStr = "";
  const res = [];
  for (let i = 0; i < key.length; i++) {
    if (!startFlag && key[i] === "[") {
      if (tempStr !== "") {
        res.push(tempStr);
      }
      tempStr = "";
      startFlag = true;
    } else if (startFlag && key[i] === "]") {
      res.push(tempStr);
      tempStr = "";
      startFlag = false;
    } else {
      tempStr += key[i];
    }
  }
  if (tempStr) {
    res.push(tempStr);
    tempStr = "";
  }
  return res;
}

function get(ob, key) {
  let k = 0;
  const keys = key.split(".");
  let target = ob[keys[k++]];
  while (target && k < keys.length) {
    target = target[keys[k++]];
  }
  return k >= keys.length ? target : null;
}

function set(ob, key, val) {
  let k = 0;
  const keys = key.split(".");
  let parent = ob;
  let propKey = keys[k++];
  let target = ob[propKey];
  while (k < keys.length) {
    if (!target) {
      parent[propKey] = /^\d+$/.test(propKey) ? [] : {};
      target = parent[propKey];
    }
    parent = target;
    propKey = keys[k++];
    target = target[propKey];
  }
  parent[propKey] = val;
}

const o = {
  a: [
    {
      x: 2,
      d: {
        b: {
          c: "0",
        },
      },
    },
  ],
};

// const target = get(o, "a.0.d.b.c");

// set({}, "a.0.d.b.c", 100);

// console.log(target);
// [0]a[1][0]
// a[1]b[0]
// ab[2]
// [1]aa
normalizeKeys("[0]a[1]");
