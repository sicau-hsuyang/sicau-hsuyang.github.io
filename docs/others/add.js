/**
 *
 * @param {string} a 字符串1
 * @param {string} b 字符串2
 */
function add(a, b) {
  const digitStrA = MyParseFloat(a);
  const digitStrB = MyParseFloat(b);
  if (Number.isNaN(digitStrA) && Number.isNaN(digitStrB)) {
    return "0";
  } else if (Number.isNaN(digitStrA)) {
    return digitStrB;
  } else if (Number.isNaN(digitStrB)) {
    return digitStrA;
  } else {
  }
}

/**
 *
 * @param {string} a
 * @param {string} b
 */
function merge(a, b) {
  let sum = null;
  if (/^-/.test(a) && /^-/.test(b)) {
    sum = "-" + _merge(a.replace("-", ""), b.replace("-", ""));
  } else if (/^-/.test(a)) {
    sum =
      Math.abs(a) > b
        ? "-" + _merge(a.replace("-", ""), b, false)
        : _merge(b, a, false);
  } else if (/^-/.test(b)) {
    sum = Math.abs(b) > a ? _merge(a, b, false) : _merge(a, b, false);
  } else {
    sum = _merge(a, b);
  }
}

/**
 *
 * @param {string} a 非负数字字符串
 * @param {string} b 非负数字字符串
 * @param {boolean} isAdd 是否是加法，如果是减法的话，a一定比b大
 */
function _merge(a, b, isAdd) {
  if (isAdd) {
    const pointAPos = a.indexOf(".");
    const digitsABefore = (pointAPos > 0 ? "" : a.substring(0, pointAPos)).split(
      ""
    );
    const digitsAAfter = (pointAPos > 0 ? a.substring(pointAPos + 1) : "").split(
      ""
    );
    const pointBPos = a.indexOf(".");
    const digitsBBefore = (pointBPos > 0 ? "" : b.substring(0, pointBPos)).split(
      ""
    );
    const digitsBAfter = (pointBPos > 0 ? b.substring(pointBPos + 1) : "").split(
      ""
    );
  } else {
  }
}
