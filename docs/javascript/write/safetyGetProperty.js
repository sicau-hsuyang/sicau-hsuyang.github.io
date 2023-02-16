/**
 * 安全的获取对象o上键为p的值(不考虑原型链)
 * @param {Object} o
 * @param {String} p p支持a.b.c或者b.a[o][d].e这样的形式，对于[]这种形式的取值，如果不按预期传递，解析的结果可能就非预期
 */
function safetyGetProperty(o, p) {
  // 非引用类型直接报错
  if (Object.prototype.toString.call(o) !== "[object Object]") {
    throw new Error("o must be a reference type");
  }
  // 如果当前对象上不存在这个key，说明用户传递的内容是复杂key，才继续后续的流程，否则可以直接取值
  if (o && o.hasOwnProperty(p)) {
    return o[p];
  }
  // 先以.形式分割，如果最后一个字符为.则视为最后想要取的键位''，如果第一个是.，则视为其为第一个键值的一部分
  const primaryKeys = p.split(".");
  if (/^\./.test(p)) {
    // 弹出空值
    primaryKeys.shift();
    // 取出真值，并且将.视为第一个键的一部分
    const tmp = primaryKeys.shift();
    primaryKeys.unshift("." + tmp);
  }
  const realKeys = [];
  for (let i = 0; i < primaryKeys.length; i++) {
    const key = primaryKeys[i];
    if (/\[[\w]+\]/.test(key)) {
      const keyGroup = parseSquareBrackets(key);
      realKeys.push(...keyGroup);
    } else {
      realKeys.push(key);
    }
  }
  let prop = realKeys.shift();
  let target = o[prop];
  // 如果target不是一个真值，那么继续循环将会报错，如果realKeys的length还存在，说明key值还没有取完，需要继续向下迭代
  while (target && realKeys.length) {
    prop = realKeys.shift();
    target = target[prop];
  }
  // 如果keys的值用尽，说明是正常终止，否则就是非正常终止的，则返回null。
  return realKeys.length === 0 ? target : null;
}

/**
 * 解析方括号中的key值
 * @param {String} prop
 */
function parseSquareBrackets(prop) {
  let pos = 0;
  let str = "";
  let parsedKeys = [];
  // 定义一个解析中的标记
  let parsing = false;
  while (pos < prop.length) {
    const char = prop[pos++];
    // 解析到第一个`[`之前的key，当前的[不计入key中
    if (char === "[") {
      if (str != "") {
        parsedKeys.push(str);
        str = "";
      }
      parsing = true;
      continue;
    }
    // 遇到`]`则视为已经解析到了一个key
    else if (char === "]" && parsing) {
      parsing = false;
      parsedKeys.push(str);
      str = "";
    } else {
      // 极端的case 单的`]`，还没有开始就已经遇到]
      str += char;
    }
  }
  // 极端case 单的`[`
  if (parsing) {
    const tmp = parsedKeys.pop();
    parsedKeys.push(tmp + "[" + str);
    str = "";
  }
  // 极端的case 单的`]`
  if (str != "") {
    parsedKeys.push(str);
    str = "";
  }
  return parsedKeys;
}

const obj = {};

const a = {};

obj.a = a;

a.b = {};
a.b["1"] = {};
a.b["1"].c = [];
a.b["1"].c[0] = "hhh";

const val = safetyGetProperty(obj, ".a.b.1.c[0].");

console.log(val);
