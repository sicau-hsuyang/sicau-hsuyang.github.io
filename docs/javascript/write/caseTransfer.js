/**
 * 驼峰转中划线
 */
function hyphenate(str) {
  return String(str).replace(/[A-Z]/g, function (match) {
    return "-" + match.toLowerCase();
  });
}

/**
 * 中划线转驼峰
 */
function camelize(str) {
  return String(str).replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
}

function aaa() {
  let a = 1,
    b = 2;
  return function ccc() {
    return { a, b };
  };
}

function bbb() {
  const result = aaa();
  const res = result();

  console.log(res);
}

bbb();

/**
 * 柯里化函数
 * @param {Function} fn
 * @returns
 */
function curring(fn) {
  return _curring.call(this, fn, fn.length);
}

function _curring(fn, length, ...args) {
  return function (...params) {
    const _args = [...args, ...params];
    if (_args.length >= length) {
      return fn.apply(this, args);
    } else {
      return _curring.call(this, fn, length, _args);
    }
  };
}
