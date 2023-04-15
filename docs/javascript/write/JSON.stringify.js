typeof JSON.stringify !== "function" && (JSON.stringify = function () {});

/**
 * 序列化Number
 * @param {number} num
 */
function stringifyNumber(num) {
  return Number.isNaN(num) || !Number.isFinite(num) ? "null" : String(num);
}

/**
 * 序列化日期对象
 * @param {Date} d
 */
function stringifyDate(d) {
  return d.toISOString();
}

/**
 * 序列化正则表达式
 * @param {new RegExp} regExp
 */
function stringifyRegexp(regExp) {
  return regExp.toString();
}

/**
 * 序列化string
 * @param {string} str
 */
function stringifyString(str) {
  return `${str}`.replace(/\\/g, "\\\\").replace(/"/g, '"');
}

/**
 * 序列化boolean
 * @param {boolean} bool
 */
function stringifyBoolean(bool) {
  return String(bool);
}

/**
 * 序列化null
 * @param {null} o
 */
function stringifyNull(o) {
  return o === null && String(o);
}

/**
 * 序列化不能序列化的内容
 * @returns
 */
function stringifyNonSerialize(o) {
  return ["undefined", "function", "symbol", "bigint"].includes(typeof o)
    ? undefined
    : o;
}

/**
 

function jsonStringify(value) {
  if (value == null) {
    return "null";
  }
  switch (typeof value) {
    case "string":
      return '"' + value.replace(/"/g, '\\"') + '"';
    case "number":
    case "boolean":
      return String(value);
    case "object":
      if (Array.isArray(value)) {
        return "[" + value.map(jsonStringify).join(",") + "]";
      } else {
        const properties = Object.entries(value)
          .filter(([key, value]) => typeof value !== "function" && value !== undefined)
          .map(([key, value]) => `"${key}":${jsonStringify(value)}`);
        return "{" + properties.join(",") + "}";
      }
    default:
      return undefined;
  }
}


 */